import { Binding, Gio, Variable } from "astal";
import { Astal, Gdk, Gtk } from "astal/gtk4";
import AstalApps from "gi://AstalApps";
import Hyprland from "gi://AstalHyprland";
import { hideLauncher } from "..";
import { ScrolledWindow } from "../../Gtk";
import { LauncherPlugin } from "./Plugin";
import { wrapIndex } from "../../../utils/util";

const appItemHeight = 56;

// didn't want to use the app.launch() method
// since it executes everything from the .config/ags dir
export const launchApp = (app: AstalApps.Application) => {
  const executable = app.executable.replace(/(%f|%F|%u|%U|%i|%c|%k)/g, "");

  // why are you launching cli programs from outside of a cli
  if ((app.app as Gio.DesktopAppInfo).get_boolean("Terminal")) {
    // Dear God, tinkle tinkle hoy! Please don't get injection attacked
    Hyprland.get_default().dispatch("exec", `kitty -e ${executable}`);
  } else {
    Hyprland.get_default().dispatch("exec", executable);
  }

  // since we're launching manually, we also need to manually increase this value
  app.set_frequency(app.frequency + 1);

  hideLauncher();
};

const scrollToSelectedItem = (
  scrolledWindow: Gtk.ScrolledWindow,
  itemIndex: number,
  itemHeight: number,
) => {
  const vadjustment = scrolledWindow.get_vadjustment();
  const targetPosition = itemIndex * itemHeight;

  // Get viewport information
  const pageSize = vadjustment.get_page_size();
  const currentValue = vadjustment.get_value();
  const maxValue = vadjustment.get_upper() - pageSize;

  if (targetPosition < currentValue) {
    vadjustment.set_value(targetPosition);
  } else if (targetPosition + itemHeight > currentValue + pageSize) {
    const newValue = Math.min(targetPosition - pageSize + itemHeight, maxValue);
    vadjustment.set_value(newValue);
  }
};

const AppItem = ({
  selected,
  app,
  index,
}: {
  selected: Variable<number>;
  app: AstalApps.Application;
  index: number;
}) => {
  const hasDescription =
    app.description !== null &&
    app.description !== undefined &&
    app.description !== "";

  return (
    <button
      heightRequest={appItemHeight}
      onClicked={() => {
        launchApp(app);
      }}
      onHoverEnter={() => selected.set(index)}
      cssClasses={selected((selected) => {
        const classes = ["app-item"];
        if (selected === index) {
          classes.push("selected");
        }
        return classes;
      })}
      hexpand
      child={
        <box spacing={8}>
          <image pixelSize={36} iconName={app.iconName} />
          <box orientation={Gtk.Orientation.VERTICAL} heightRequest={40}>
            <label
              cssClasses={["app-title"]}
              label={app.name}
              xalign={0}
              heightRequest={!hasDescription ? 40 : -1}
            />
            <label
              cssClasses={["app-desc"]}
              visible={hasDescription}
              label={app.description}
              xalign={0}
            />
          </box>
        </box>
      }
    />
  );
};

const AppSearchResults = ({
  searchResults,
  selected,
}: {
  searchResults: Binding<AstalApps.Application[]>;
  selected: Variable<number>;
}) => {
  let scrollRef: Gtk.ScrolledWindow;
  selected.subscribe((index) => {
    scrollToSelectedItem(scrollRef, index, appItemHeight);
  });

  return (
    <ScrolledWindow
      setup={(self) => {
        scrollRef = self;
      }}
      cssClasses={["app-results"]}
      heightRequest={400}
      maxContentHeight={400}
      hscrollbarPolicy={Gtk.PolicyType.NEVER}
      vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
      kineticScrolling
      overlayScrolling
      propagateNaturalHeight
      child={searchResults.as((results) =>
        results.length > 0 ? (
          <box orientation={Gtk.Orientation.VERTICAL} marginEnd={12}>
            {results.map((app, i) => (
              <AppItem selected={selected} app={app} index={i} />
            ))}
          </box>
        ) : (
          <label hexpand vexpand label={"No Applications Found"} />
        ),
      )}
    />
  );
};

export class AppSearch extends LauncherPlugin {
  static get_default(input: Variable<string>): LauncherPlugin {
    if (!AppSearch.instance) AppSearch.instance = new AppSearch(input);
    return AppSearch.instance;
  }

  static apps = new AstalApps.Apps();

  // doesn't work if not static for some reason
  selected = Variable(0);

  appSearchResults = this.input((str) => AppSearch.apps.fuzzy_query(str));

  iconName = "system-search";

  placeholderText = "Search";

  constructor(input: Variable<string>) {
    super(input);
    this.appSearchResults.subscribe(() => this.selected.set(0));
  }

  activate(): void {
    launchApp(this.appSearchResults.get()[this.selected.get()]);
  }

  getWidget(): Gtk.Widget {
    return (
      <AppSearchResults
        selected={this.selected}
        searchResults={this.appSearchResults}
      />
    );
  }

  handleKeyPress(
    _self: Astal.Window,
    keyval: number,
    _keycode: number,
    state: Gdk.ModifierType,
  ): void {
    if (state === Gdk.ModifierType.CONTROL_MASK) {
      if (keyval === Gdk.KEY_p) {
        this.selected.set(
          wrapIndex(
            this.selected.get() - 1,
            this.appSearchResults.get().length,
          ),
        );
      }
      if (keyval === Gdk.KEY_n) {
        this.selected.set(
          wrapIndex(
            this.selected.get() + 1,
            this.appSearchResults.get().length,
          ),
        );
      }
    }
    if (keyval === Gdk.KEY_Up) {
      return this.selected.set(
        wrapIndex(this.selected.get() - 1, this.appSearchResults.get().length),
      );
    }

    if (keyval === Gdk.KEY_Down)
      return this.selected.set(
        wrapIndex(this.selected.get() + 1, this.appSearchResults.get().length),
      );
  }

  cleanup(): void {
    this.selected.set(0);
  }
}
