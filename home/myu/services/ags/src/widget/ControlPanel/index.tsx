import { App, Astal, Gdk, Gtk } from "astal/gtk4";
import { SharedState } from "../../app";
import { hideOnClickAway } from "../../utils/util";
import { derive } from "astal";
import { ControlPanel } from "./ControlPanel";

export const ControlPanelMenu = ({ showControlPanel }: SharedState) => {
  const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor;

  const showWindow = derive([showControlPanel], (show) => show);
  return (
    <window
      visible={showWindow()}
      name={"control-panel"}
      namespace={"control-panel"}
      layer={Astal.Layer.TOP}
      exclusivity={Astal.Exclusivity.NORMAL}
      anchor={TOP | BOTTOM | LEFT | RIGHT}
      application={App}
      onButtonPressed={hideOnClickAway(() => showControlPanel.set(false))}
      focusable
      onFocusLeave={() => showControlPanel.set(false)}
      keymode={Astal.Keymode.ON_DEMAND}
      onKeyPressed={(_self, keyval) => {
        if (keyval === Gdk.KEY_Escape) showControlPanel.set(false);
      }}
      child={
        <revealer
          valign={Gtk.Align.START}
          halign={Gtk.Align.END}
          revealChild={showControlPanel()}
          transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
          child={
            <box
              cssClasses={["control-panel-menu"]}
              overflow={Gtk.Overflow.HIDDEN}
            >
              <ControlPanel />
              <box visible={false} cssClasses={["separator"]} />
            </box>
          }
        />
      }
    />
  );
};
