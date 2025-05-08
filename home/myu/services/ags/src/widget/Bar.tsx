import { App, Astal, Gdk } from "astal/gtk4";
import { Variable } from "astal";
import Clock from "./modules/Clock";

const time = Variable("").poll(1000, "date");

const Start = () => <box></box>;

const Center = () => <box></box>;

const End = () => (
  <box>
    <Clock />
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
    >
      <centerbox>
        <Start />
        <Center />
        <End />
      </centerbox>
    </window>
  );
}
