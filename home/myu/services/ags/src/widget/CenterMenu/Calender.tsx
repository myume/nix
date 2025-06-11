import { GLib, Variable } from "astal";
import { astalify, Gtk } from "astal/gtk4";

const Calendar = astalify<Gtk.Calendar, Gtk.Calendar.ConstructorProps>(
  Gtk.Calendar,
);

export const CalendarView = () => {
  const time = Variable<string>("").poll(
    1000,
    () => GLib.DateTime.new_now_local().format("%H:%M")!,
  );
  const date = Variable<string>("").poll(
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
        child={
          <box orientation={Gtk.Orientation.VERTICAL}>
            <label cssClasses={["time"]} label={time()} />
            <label cssClasses={["date"]} label={date()} />
          </box>
        }
      />
      <Calendar
        setup={(self) => {
          calendar = self;
        }}
        cssClasses={["calender"]}
        overflow={Gtk.Overflow.HIDDEN}
        vexpand
      />
    </box>
  );
};
