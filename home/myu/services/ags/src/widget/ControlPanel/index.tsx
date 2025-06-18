import { App, Astal, Gdk, Gtk } from "astal/gtk4";
import { SharedState } from "../../app";
import { hideOnClickAway } from "../../utils/util";
import { derive, Variable } from "astal";
import { ControlPanel } from "./ControlPanel";
import {
  NotificationCenter,
  notificationCenterName,
} from "./NotificationCenter";
import { NetworkPage } from "./Pages/NetworkPage";

export const windowName = "control-panel";

export const ControlPanelMenu = ({ showControlPanel }: SharedState) => {
  const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor;

  const showWindow = derive([showControlPanel], (show) => show);

  const pageName = Variable(notificationCenterName);
  const closeMenu = () => {
    showControlPanel.set(false);
    pageName.set(notificationCenterName);
  };
  return (
    <window
      visible={showWindow()}
      name={windowName}
      namespace={windowName}
      layer={Astal.Layer.TOP}
      exclusivity={Astal.Exclusivity.NORMAL}
      anchor={TOP | BOTTOM | LEFT | RIGHT}
      application={App}
      onButtonPressed={hideOnClickAway(closeMenu)}
      focusable
      onFocusLeave={closeMenu}
      keymode={Astal.Keymode.ON_DEMAND}
      onKeyPressed={(_self, keyval) => {
        if (keyval === Gdk.KEY_Escape) closeMenu();
      }}
      child={
        <revealer
          valign={Gtk.Align.START}
          halign={Gtk.Align.END}
          revealChild={showControlPanel()}
          transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
          child={
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
              <stack visibleChildName={pageName()} homogeneous>
                <NotificationCenter />
                <NetworkPage setPageName={(name) => pageName.set(name)} />
              </stack>
            </box>
          }
        />
      }
    />
  );
};
