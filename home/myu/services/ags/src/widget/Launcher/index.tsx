import { Binding, Variable } from "astal";
import { App, Astal, Gdk, Gtk } from "astal/gtk4";
import { hideOnClickAway } from "../../utils/util";
import { AppSearch } from "./Plugins/AppSearch.1";
import { LauncherPlugin } from "./Plugins/Plugin";

enum Mode {
  App,
  Calc,
}

const modes = Object.values(Mode).filter(
  (val) => typeof val === "number",
) as Mode[];

export const hideLauncher = () => App.get_window("launcher")?.hide();

export function Launcher() {
  const searchString = Variable("");

  let entryRef: Gtk.Entry | null = null;

  const modeIndex = Variable(0);
  const mode = modeIndex((index) => modes[index]);
  const plugin: Binding<LauncherPlugin> = mode.as((mode) => {
    switch (mode) {
      case Mode.App:
        return new AppSearch(searchString);
      case Mode.Calc:
        return new AppSearch(searchString);
    }
  });

  return (
    <window
      name={"launcher"}
      namespace={"launcher"}
      cssClasses={["launcher-container"]}
      application={App}
      layer={Astal.Layer.OVERLAY}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.BOTTOM |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT
      }
      onButtonPressed={(self, state) =>
        hideOnClickAway(() => self.hide())(self, state)
      }
      exclusivity={Astal.Exclusivity.IGNORE}
      keymode={Astal.Keymode.ON_DEMAND}
      onShow={() => {
        modeIndex.set(0);
        searchString.set("");
        entryRef?.set({ text: "" });
        entryRef?.grab_focus();
        plugin.get().cleanup();
      }}
      focusable
      onFocusLeave={(self) => self.hide()}
      onKeyPressed={(self, keyval, keycode, state) => {
        if (keyval === Gdk.KEY_Tab) {
          modeIndex.set((modeIndex.get() + 1) % modes.length);
        }

        plugin.get().handleKeyPress(self, keyval, keycode, state);

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
          halign={Gtk.Align.CENTER}
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
              plugin.get().activate();
            }}
          />
          <box cssClasses={["separator"]} />
          {plugin.as((plugin) => plugin.getWidget())}
        </box>
      }
    />
  );
}
