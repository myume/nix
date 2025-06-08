import { App, Astal, Gdk } from "astal/gtk4";
import Time from "./modules/Time";
import Tray from "./modules/Tray";
import Workspaces from "./modules/Workspaces";
import Player from "./modules/Player";
import Status from "./Status";

const Start = () => (
  <box cssClasses={["start", "section"]} child={<Workspaces />}></box>
);

const Center = () => (
  <box cssClasses={["center", "section"]}>
    <Time />
    <Player />
  </box>
);

const End = () => (
  <box cssClasses={["end", "section"]}>
    <Tray />
    <Status />
  </box>
);

export function Bar(gdkmonitor: Gdk.Monitor) {
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
          <Center />
          <End />
        </centerbox>
      }
    />
  );
}
