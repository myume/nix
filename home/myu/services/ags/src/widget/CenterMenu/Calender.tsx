import { GLib, Variable } from "astal";
import { Gtk } from "astal/gtk4";

export const Calender = () => {
  const time = Variable<string>("").poll(
    1000,
    () => GLib.DateTime.new_now_local().format("%H:%M")!,
  );
  const date = Variable<string>("").poll(
    1000,
    () => GLib.DateTime.new_now_local().format("%A, %B %d, %G")!,
  );
  return (
    <box
      cssClasses={["calender-container"]}
      orientation={Gtk.Orientation.VERTICAL}
      spacing={12}
    >
      <box
        cssClasses={["datetime"]}
        orientation={Gtk.Orientation.VERTICAL}
        valign={Gtk.Align.START}
      >
        <label cssClasses={["time"]} label={time()} />
        <label cssClasses={["date"]} label={date()} />
      </box>
      <Gtk.Calendar
        cssClasses={["calender"]}
        overflow={Gtk.Overflow.HIDDEN}
        vexpand
      />
    </box>
  );
};
