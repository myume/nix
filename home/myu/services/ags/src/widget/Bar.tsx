import { App, Astal, Gdk } from "astal/gtk4";
import Time from "./modules/Time";
import Battery from "./modules/Battery";
import Network from "./modules/Network";
import Audio from "./modules/Audio";
import Brightness from "./modules/Brightness";
import Tray from "./modules/Tray";

const Start = () => <box></box>;

const Center = () => <box children={[<Time />]}></box>;

const End = () => (
  <box>
    <Tray />
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
