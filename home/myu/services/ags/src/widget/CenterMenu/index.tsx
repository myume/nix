import { App, Astal, Gtk } from "astal/gtk4";
import { SharedState } from "../../app";
import { derive } from "astal";
import { Calender } from "./Calender";
import { MediaControlMenu } from "./MediaControls";

export function CenterMenu({
  showCalender,
  showMediaControls,
  currentPlayer,
}: SharedState) {
  return (
    <window
      setup={(self) => {
        showCalender.subscribe(() => self.queue_resize());
        showMediaControls.subscribe(() => self.queue_resize());
      }}
      visible={derive([showCalender, showMediaControls])(
        ([showCalender, showMediaControls]) =>
          showCalender || showMediaControls,
      )}
      namespace={"center-menu"}
      cssClasses={["center-menu"]}
      layer={Astal.Layer.TOP}
      exclusivity={Astal.Exclusivity.NORMAL}
      anchor={Astal.WindowAnchor.TOP}
      application={App}
      resizable={false}
      heightRequest={330}
      child={
        <box>
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
