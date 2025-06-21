import { Binding, Variable } from "astal";
import { App, Astal, Gdk, Gtk } from "astal/gtk4";
import { hideOnClickAway } from "../../utils/util";
import { LauncherPlugin } from "./Plugins/Plugin";
import { AppSearch } from "./Plugins/AppSearch";
import { Calculator } from "./Plugins/Calculator";

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
        return AppSearch.get_default(searchString);
      case Mode.Calc:
        return Calculator.get_default(searchString);
    }
  });

  plugin.subscribe(() => {
    entryRef?.set({ text: "" });
    entryRef?.grab_focus();
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
        plugin.get().cleanup();
        modeIndex.set(0);
        searchString.set("");
        entryRef?.set({ text: "" });
        entryRef?.grab_focus();
      }}
      onKeyPressed={(self, keyval, keycode, state) => {
        if (keyval === Gdk.KEY_Tab) {
          modeIndex.set((modeIndex.get() + 1) % modes.length);
        }
        // how the hell was i supposed to figure out that shift tab is this magical number
        if (keyval === Gdk.KEY_ISO_Left_Tab) {
          modeIndex.set((modeIndex.get() - 1) % modes.length);
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
            cssClasses={["input"]}
            primaryIconName={plugin.as(({ iconName }) => iconName)}
            setup={(self) => {
              entryRef = self;
            }}
            placeholderText={plugin.as(
              ({ placeholderText }) => placeholderText,
            )}
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
          <box child={plugin.as((plugin) => plugin.getWidget())} />
        </box>
      }
    />
  );
}
