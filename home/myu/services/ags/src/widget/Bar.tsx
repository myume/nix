import { App, Astal, Gdk } from "astal/gtk4";
import Time from "./modules/Time";
import Battery from "./modules/Battery";
import Network from "./modules/Network";
import Audio from "./modules/Audio";
import Brightness from "./modules/Brightness";
import Tray from "./modules/Tray";
import Bluetooth from "./modules/Bluetooth";
import Workspaces from "./modules/Workspaces";
import Player from "./modules/Player";

const Start = () => <box child={<Workspaces />}></box>;

const Center = () => (
  <box>
    <Time />
    <Player />
  </box>
);

const End = () => (
  <box>
    <Tray />
    <Bluetooth />
    <Brightness />
    <Audio />
    <Network />
    <Battery />
  </box>
);

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

  return (
    <window
      visible
      cssClasses={["Bar"]}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | RIGHT | LEFT}
      application={App}
      child={
        <centerbox>
          <Start />
          <Center />
          <End />
        </centerbox>
      }
    />
  );
}
