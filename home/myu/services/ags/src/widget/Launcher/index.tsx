import App from "ags/gtk4/app";
import { Astal, Gdk, Gtk } from "ags/gtk4";
import { hideOnClickAway, wrapIndex } from "../../utils/util";
import { AppSearch } from "./Plugins/AppSearch";
import { Calculator } from "./Plugins/Calculator";
import { createState, With } from "ags";

enum Mode {
  App,
  Calc,
}

const modes = Object.values(Mode).filter(
  (val) => typeof val === "number",
) as Mode[];

export const hideLauncher = () => App.get_window("launcher")?.hide();

export function Launcher() {
  const [searchString, setSearchString] = createState("");

  let entryRef: Gtk.Entry | null = null;

  const [modeIndex, setModeIndex] = createState(0);
  const mode = modeIndex((index) => modes[index % modes.length]);
  const plugin = mode((mode) => {
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

  let window: Astal.Window;

  return (
    <window
      $={(self) => {
        window = self;
      }}
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
      exclusivity={Astal.Exclusivity.IGNORE}
      keymode={Astal.Keymode.ON_DEMAND}
      onShow={() => {
        plugin.get().cleanup();
        setModeIndex(0);
        setSearchString("");
        entryRef?.set({ text: "" });
        entryRef?.grab_focus();
      }}
    >
      <Gtk.EventControllerFocus onLeave={() => window.hide()} />
      <Gtk.GestureClick
        onPressed={(_self, _, x, y) =>
          hideOnClickAway(() => window.hide())(window, x, y)
        }
      />
      <Gtk.EventControllerKey
        onKeyPressed={(_self, keyval, keycode, state) => {
          if (keyval === Gdk.KEY_Tab) {
            setModeIndex(wrapIndex(modeIndex.get() + 1, modes.length));
            return true;
          }
          // how the hell was i supposed to figure out that shift tab is this magical number
          if (keyval === Gdk.KEY_ISO_Left_Tab) {
            setModeIndex(wrapIndex(modeIndex.get() - 1, modes.length));
            return true;
          }

          plugin.get().handleKeyPress(window, keyval, keycode, state);

          if (keyval === Gdk.KEY_Escape) {
            window.hide();
            return true;
          }
        }}
      />
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
          $={(self) => {
            entryRef = self;
          }}
          placeholderText={plugin.as(({ placeholderText }) => placeholderText)}
          onNotifyText={({ text }) => {
            if (text !== searchString.get()) {
              setSearchString(text);
            }
          }}
          onActivate={() => {
            plugin.get().activate();
          }}
        />
        <box cssClasses={["separator"]} />
        <box>
          <With value={plugin}>{(plugin) => plugin.getWidget()}</With>
        </box>
      </box>
    </window>
  );
}
