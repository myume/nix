import { State } from "ags";
import { createPoll } from "ags/time";
import GLib from "gi://GLib";

export default function Time({
  showCalender: [showCalender, setShowCalender],
  format = "%a %b %d  %H:%M",
}: {
  showCalender: State<boolean>;
  format?: string;
}) {
  const time = createPoll(
    "",
    1000,
    () => GLib.DateTime.new_now_local().format(format)!,
  );

  return (
    <box cssClasses={["time"]}>
      <button
        cssClasses={showCalender((show) => (show ? ["toggled"] : []))}
        onClicked={() => setShowCalender(!showCalender.get())}
      >
        <label label={time} />
      </button>
    </box>
  );
}
