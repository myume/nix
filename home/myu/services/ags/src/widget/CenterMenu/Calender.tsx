import { createPoll } from "ags/time";
import { Gtk } from "ags/gtk4";
import GLib from "gi://GLib";

export const CalendarView = () => {
  const time = createPoll(
    "",
    1000,
    () => GLib.DateTime.new_now_local().format("%H:%M")!,
  );
  const date = createPoll(
    "",
    1000,
    () => GLib.DateTime.new_now_local().format("%A, %B %d, %G")!,
  );

  let calendar: Gtk.Calendar;

  return (
    <box
      cssClasses={["calender-container"]}
      orientation={Gtk.Orientation.VERTICAL}
      spacing={12}
    >
      <button
        cssClasses={["datetime"]}
        valign={Gtk.Align.START}
        onClicked={() => {
          const today = new Date();
          calendar.set_day(today.getDate());
          calendar.set_month(today.getMonth());
          calendar.set_year(today.getFullYear());
        }}
      >
        <box orientation={Gtk.Orientation.VERTICAL}>
          <label cssClasses={["time"]} label={time} />
          <label cssClasses={["date"]} label={date} />
        </box>
      </button>
      <Gtk.Calendar
        $={(self) => {
          calendar = self;
        }}
        cssClasses={["calender"]}
        overflow={Gtk.Overflow.HIDDEN}
        vexpand
      />
    </box>
  );
};
