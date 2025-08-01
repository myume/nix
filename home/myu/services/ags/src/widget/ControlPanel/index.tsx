import App from "ags/gtk4/app";
import { Astal, Gdk, Gtk } from "ags/gtk4";
import { SharedState } from "../../app";
import { hideOnClickAway } from "../../utils/util";
import {
  NotificationCenter,
  notificationCenterName,
} from "./NotificationCenter";
import { NetworkPage } from "./Pages/NetworkPage";
import { PowerProfilePage } from "./Pages/PowerProfile";
import { ControlPanel } from "./ControlPanel";
import { createComputed, createState } from "ags";
import { AudioPage } from "./Pages/AudioPage";

export const windowName = "control-panel";

export const ControlPanelMenu = ({
  showControlPanel: [showControlPanel, setShowControlPanel],
}: SharedState) => {
  const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor;

  const showWindow = createComputed([showControlPanel], (show) => show);

  const pageName = createState(notificationCenterName);
  const [getPageName, setPageName] = pageName;
  const closeMenu = () => {
    setShowControlPanel(false);
    setPageName(notificationCenterName);
  };

  const returnToNotifications = () => setPageName(notificationCenterName);
  let window: Astal.Window;

  return (
    <window
      $={(self) => (window = self)}
      visible={showWindow}
      name={windowName}
      namespace={windowName}
      layer={Astal.Layer.TOP}
      exclusivity={Astal.Exclusivity.NORMAL}
      anchor={TOP | BOTTOM | LEFT | RIGHT}
      application={App}
      keymode={Astal.Keymode.ON_DEMAND}
      focusable
    >
      <Gtk.EventControllerFocus onLeave={closeMenu} />
      <Gtk.GestureClick
        onPressed={(_self, _, x, y) => hideOnClickAway(closeMenu)(window, x, y)}
      />
      <Gtk.EventControllerKey
        onKeyPressed={(_self, keyval) => {
          if (keyval === Gdk.KEY_Escape) closeMenu();
        }}
      />
      <revealer
        valign={Gtk.Align.START}
        halign={Gtk.Align.END}
        revealChild={showControlPanel}
        transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
      >
        <box
          orientation={Gtk.Orientation.VERTICAL}
          cssClasses={["control-panel-menu"]}
          overflow={Gtk.Overflow.HIDDEN}
          spacing={12}
        >
          <ControlPanel
            closeControlPanel={closeMenu}
            setPageName={(name) => setPageName(name)}
          />
          <stack
            visibleChildName={getPageName}
            transitionType={getPageName((name) =>
              name === notificationCenterName
                ? Gtk.StackTransitionType.SLIDE_RIGHT
                : Gtk.StackTransitionType.SLIDE_LEFT,
            )}
            hhomogeneous
            vhomogeneous
          >
            <NotificationCenter />
            <NetworkPage
              returnHome={returnToNotifications}
              currentPageName={getPageName}
            />
            <PowerProfilePage returnHome={returnToNotifications} />
            <AudioPage
              returnHome={returnToNotifications}
              currentPageName={getPageName}
            />
          </stack>
        </box>
      </revealer>
    </window>
  );
};
