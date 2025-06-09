import { Binding, Variable } from "astal";
import { App, Astal, Gdk, Gtk } from "astal/gtk4";
import AstalApps from "gi://AstalApps";
import { ScrolledWindow } from "../Gtk";
import Hyprland from "gi://AstalHyprland";

const hideLauncher = () => App.get_window("launcher")?.hide();

// didn't want to use the app.launch() method
// since it executes everything from the .config/ags dir
const launchApp = (app: AstalApps.Application) => {
  const executable = app.executable.replace(/(%f|%F|%u|%U|%i|%c|%k)/g, "");

  // why are you launching cli programs from outside of a cli
  if (app.categories.includes("ConsoleOnly")) {
    Hyprland.get_default().dispatch("exec", `$TERMINAL -e ${executable}`);
  } else {
    Hyprland.get_default().dispatch("exec", executable);
  }

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

const appItemHeight = 56;

const SearchResults = ({
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
          <label>No Applications Found</label>
        ),
      )}
    />
  );
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
export function Launcher(gdkmonitor: Gdk.Monitor) {
  const apps = new AstalApps.Apps();

  const searchString = Variable("");
  const selected = Variable(0);

  let entryRef: Gtk.Entry | null = null;

  const searchResults = searchString((str) =>
    apps.fuzzy_query(str).sort((a, b) => b.frequency - a.frequency),
  );
  searchResults.subscribe(() => selected.set(0));

  return (
    <window
      name={"launcher"}
      namespace={"launcher"}
      cssClasses={["launcher-container"]}
      layer={Astal.Layer.OVERLAY}
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.BOTTOM}
      exclusivity={Astal.Exclusivity.IGNORE}
      gdkmonitor={gdkmonitor}
      application={App}
      keymode={Astal.Keymode.ON_DEMAND}
      onShow={() => {
        selected.set(0);
        searchString.set("");
        entryRef?.set({ text: "" });
        entryRef?.grab_focus();
      }}
      onFocusLeave={(self) => self.hide()}
      onKeyPressed={(self, keyval, _, state) => {
        if (state === Gdk.ModifierType.CONTROL_MASK) {
          if (keyval === Gdk.KEY_p) {
            selected.set(Math.max(0, selected.get() - 1));
          }
          if (keyval === Gdk.KEY_n) {
            selected.set(
              Math.min(selected.get() + 1, searchResults.get().length - 1),
            );
          }
        }
        if (keyval === Gdk.KEY_Up) {
          selected.set(Math.max(0, selected.get() - 1));
        }

        if (keyval === Gdk.KEY_Down)
          selected.set(
            Math.min(selected.get() + 1, searchResults.get().length - 1),
          );

        if (keyval === Gdk.KEY_Escape) {
          self.hide();
        }
      }}
      onDestroy={() => {
        searchString.drop();
      }}
      child={
        <box
          cssClasses={["launcher"]}
          valign={Gtk.Align.CENTER}
          orientation={Gtk.Orientation.VERTICAL}
          widthRequest={700}
          spacing={12}
        >
          <entry
            cssClasses={["search"]}
            primaryIconName={"system-search"}
            setup={(self) => {
              entryRef = self;
            }}
            placeholderText={"Search"}
            onChanged={(self) => {
              if (self.text !== searchString.get()) {
                searchString.set(self.text);
              }
            }}
            onActivate={() => {
              launchApp(searchResults.get()[selected.get()]);
            }}
          />
          <box cssClasses={["separator"]} />
          <SearchResults searchResults={searchResults} selected={selected} />
        </box>
      }
    />
  );
}
