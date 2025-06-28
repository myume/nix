import App from "ags/gtk4/app";
import { Astal, Gdk } from "ags/gtk4";
import Time from "./modules/Time";
import Tray from "./modules/Tray";
import Workspaces from "./modules/Workspaces";
import Player from "./modules/Player";
import Status from "./Status";
import { SharedState } from "../../app";

const Start = () => (
  <box cssClasses={["start", "section"]}>
    <Workspaces />
  </box>
);

const Center = ({
  state: { showCalender, showMediaControls, currentPlayer },
}: {
  state: SharedState;
}) => (
  <box cssClasses={["center", "section"]}>
    <Time showCalender={showCalender} />
    <Player
      mediaControlState={showMediaControls}
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
    >
      <centerbox>
        <Start />
        <Center state={state} />
        <End state={state} />
      </centerbox>
    </window>
  );
};
