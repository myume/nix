import { App, Astal, Gtk } from "astal/gtk4";
import { SharedState } from "../../app";
import { derive } from "astal";
import { Calender } from "./Calender";
import { MediaControlMenu } from "./MediaControls";
import { hideOnClickAway } from "../Launcher";

export function CenterMenu({
  showCalender,
  showMediaControls,
  currentPlayer,
}: SharedState) {
  return (
    <window
      visible={derive([showCalender, showMediaControls])(
        ([showCalender, showMediaControls]) =>
          showCalender || showMediaControls,
      )}
      namespace={"center-menu"}
      layer={Astal.Layer.TOP}
      exclusivity={Astal.Exclusivity.NORMAL}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT |
        Astal.WindowAnchor.BOTTOM
      }
      application={App}
      onButtonPressed={hideOnClickAway(() => {
        showCalender.set(false);
        showMediaControls.set(false);
      })}
      child={
        <box
          cssClasses={["center-menu"]}
          halign={Gtk.Align.CENTER}
          valign={Gtk.Align.START}
        >
          <revealer
            revealChild={showCalender()}
            transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
            child={<Calender />}
          />
          <box
            cssClasses={["separator"]}
            visible={derive(
              [showCalender, showMediaControls],
              (showCalender, showMediaControls) =>
                showCalender && showMediaControls,
            )()}
          />
          <revealer
            revealChild={showMediaControls()}
            transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
            child={currentPlayer((player) => (
              <MediaControlMenu currentPlayer={player} />
            ))}
          />
        </box>
      }
    />
  );
}
