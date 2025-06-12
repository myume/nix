import { App, Astal, Gdk } from "astal/gtk4";
import Time from "./modules/Time";
import Tray from "./modules/Tray";
import Workspaces from "./modules/Workspaces";
import Player from "./modules/Player";
import Status from "./Status";
import { SharedState } from "../../app";

const Start = () => (
  <box cssClasses={["start", "section"]} child={<Workspaces />}></box>
);

const Center = ({
  state: { showCalender, showMediaControls, currentPlayer },
}: {
  state: SharedState;
}) => (
  <box spacing={3} cssClasses={["center", "section"]}>
    <Time showCalender={showCalender} />
    <Player
      showMediaControls={showMediaControls}
      currentPlayer={currentPlayer}
    />
  </box>
);

const End = ({ state: { showControlPanel } }: { state: SharedState }) => (
  <box cssClasses={["end", "section"]}>
    <Tray />
    <Status showControlPanel={showControlPanel} />
  </box>
);

export const Bar = (state: SharedState) => (gdkmonitor: Gdk.Monitor) => {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

  return (
    <window
      visible
      name={"top-bar"}
      namespace={"top-bar"}
      cssClasses={["bar"]}
      layer={Astal.Layer.TOP}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      heightRequest={12}
      gdkmonitor={gdkmonitor}
      anchor={TOP | RIGHT | LEFT}
      application={App}
      child={
        <centerbox>
          <Start />
          <Center state={state} />
          <End state={state} />
        </centerbox>
      }
    />
  );
};
