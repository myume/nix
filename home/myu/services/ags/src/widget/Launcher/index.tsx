import { Binding, Variable } from "astal";
import { App, Astal, Gdk, Gtk } from "astal/gtk4";
import AstalApps from "gi://AstalApps";
import { ScrolledWindow } from "../Gtk";

const hideLauncher = () => App.get_window("launcher")?.hide();

const SearchResults = ({
  searchResults,
  selected,
}: {
  searchResults: Binding<AstalApps.Application[]>;
  selected: Variable<number>;
}) => {
  return (
    <ScrolledWindow
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
          <box orientation={Gtk.Orientation.VERTICAL}>
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
      onClicked={() => {
        app.launch();
        hideLauncher();
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

  const searchResults = searchString((str) => apps.fuzzy_query(str));
  searchResults.subscribe(() => selected.set(0));

  return (
    <window
      visible={false}
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
              searchResults.get()[selected.get()].launch();
              hideLauncher();
            }}
          />
          <box cssClasses={["separator"]} />
          <SearchResults searchResults={searchResults} selected={selected} />
        </box>
      }
    />
  );
}
