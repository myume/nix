import App from "ags/gtk4/app";
import { Astal, Gdk, Gtk } from "ags/gtk4";
import { hideOnClickAway } from "../../utils/util";
import { execAsync } from "ags/process";
import { createState } from "ags";

export const windowName = "power-menu";

export const PowerMenu = () => {
  const [reveal, setReveal] = createState(false);

  let window: Astal.Window;

  const hideWindow = (window: Gtk.Window) => {
    setReveal(false);
    window.close();
  };

  <window
    $={(self) => {
      window = self;
    }}
    name={windowName}
    namespace={windowName}
    cssClasses={[windowName]}
    layer={Astal.Layer.OVERLAY}
    application={App}
    anchor={
      Astal.WindowAnchor.TOP |
      Astal.WindowAnchor.BOTTOM |
      Astal.WindowAnchor.LEFT |
      Astal.WindowAnchor.RIGHT
    }
    onShow={(_self) => {
      setReveal(true);
    }}
    exclusivity={Astal.Exclusivity.IGNORE}
    keymode={Astal.Keymode.ON_DEMAND}
    focusable
  >
    <box>
      <Gtk.EventControllerFocus onLeave={() => hideWindow(window)} />
      <Gtk.GestureClick
        onPressed={(_self, _npress, x, y) =>
          hideOnClickAway(() => hideWindow(window))(window, x, y)
        }
      />
      <Gtk.EventControllerKey
        onKeyPressed={(_self, keyval, _keycode, _state) => {
          if (keyval === Gdk.KEY_Escape) {
            hideWindow(window);
          }
        }}
      />
      <revealer
        halign={Gtk.Align.CENTER}
        valign={Gtk.Align.CENTER}
        revealChild={reveal}
      >
        <box cssClasses={["selection"]} spacing={4}>
          <button
            onClicked={() => execAsync("systemctl poweroff")}
            tooltipText={"Shutdown"}
            cssClasses={["shutdown"]}
          >
            <image pixelSize={36} iconName={"system-shutdown-symbolic"} />
          </button>
          <button
            cssClasses={["reboot"]}
            tooltipText={"Reboot"}
            onClicked={() => execAsync("systemctl reboot")}
          >
            <image pixelSize={36} iconName={"system-reboot-symbolic"} />
          </button>
          <button
            cssClasses={["suspend"]}
            tooltipText={"Suspend"}
            onClicked={() => execAsync("systemctl suspend")}
          >
            <image pixelSize={36} iconName={"system-suspend-symbolic"} />
          </button>
          <button
            cssClasses={["log-out"]}
            tooltipText={"Logout"}
            onClicked={() => execAsync("hyprctl dispatch exit")}
          >
            <image pixelSize={36} iconName={"system-log-out-symbolic"} />
          </button>
          <button
            cssClasses={["lock"]}
            tooltipText={"Lock"}
            onClicked={() => execAsync("hyprlock")}
          >
            <image pixelSize={36} iconName={"system-lock-screen-symbolic"} />
          </button>
        </box>
      </revealer>
    </box>
  </window>;
};
