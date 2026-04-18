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

  const resetDate = () => {
    const today = new Date();
    calendar.day = today.getDate();
    calendar.month = today.getMonth();
    calendar.year = today.getFullYear();
  };

  return (
    <box
      cssClasses={["calender-container"]}
      orientation={Gtk.Orientation.VERTICAL}
      spacing={12}
    >
      <button
        cssClasses={["datetime"]}
        valign={Gtk.Align.START}
        onClicked={resetDate}
      >
        <box orientation={Gtk.Orientation.VERTICAL}>
          <label cssClasses={["time"]} label={time} />
          <label cssClasses={["date"]} label={date} />
        </box>
      </button>
      <Gtk.Calendar
        $={(self) => {
          calendar = self;
          self.connect("map", resetDate);
        }}
        cssClasses={["calender"]}
        overflow={Gtk.Overflow.HIDDEN}
        vexpand
      />
    </box>
  );
};
