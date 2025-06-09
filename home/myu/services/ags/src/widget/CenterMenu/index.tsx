import { App, Astal, Gtk } from "astal/gtk4";
import { SharedState } from "../../app";
import { derive } from "astal";
import { Calender } from "./Calender";
import { MediaControls } from "./MediaControls";

export function CenterMenu({ showCalender, showMediaControls }: SharedState) {
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
      child={
        <box>
          <revealer
            revealChild={showCalender()}
            transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
            child={<Calender />}
          />
          <box />
          <revealer
            revealChild={showMediaControls()}
            transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
            child={<MediaControls />}
          />
        </box>
      }
    />
  );
}
