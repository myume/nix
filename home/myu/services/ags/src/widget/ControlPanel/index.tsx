import App from "ags/gtk4/app";
import { Astal, Gdk, Gtk } from "ags/gtk4";
import { SharedState } from "../../app";
import { hideOnClickAway } from "../../utils/util";
import {
  NotificationCenter,
  notificationCenterName,
} from "./NotificationCenter";
import { NetworkPage, networkPageName } from "./Pages/NetworkPage";
import { PowerProfilePage } from "./Pages/PowerProfile";
import { ControlPanel } from "./ControlPanel";
import { createComputed, createState } from "ags";

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

  const returnToNotifications = () => pageName.set(notificationCenterName);
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
      focusable
      onNotifyHasFocus={({ hasFocus }) => {
        if (!hasFocus) closeMenu();
      }}
      keymode={Astal.Keymode.ON_DEMAND}
    >
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
            setPageName={(name) => pageName.set(name)}
          />
          <stack
            visibleChildName={getPageName}
            transitionType={getPageName((name) =>
              name === networkPageName
                ? Gtk.StackTransitionType.SLIDE_RIGHT
                : Gtk.StackTransitionType.SLIDE_LEFT,
            )}
            hhomogeneous
            vhomogeneous
          >
            <NotificationCenter />
            <NetworkPage
              returnHome={returnToNotifications}
              currentPageName={pageName}
            />
            <PowerProfilePage returnHome={returnToNotifications} />
          </stack>
        </box>
      </revealer>
    </window>
  );
};
