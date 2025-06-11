import { GLib } from "astal";
import Variable from "astal/variable";

export default function Time({
  showCalender,
  format = "%a %b %d  %H:%M",
}: {
  showCalender: Variable<boolean>;
  format?: string;
}) {
  const time = Variable<string>("").poll(
    1000,
    () => GLib.DateTime.new_now_local().format(format)!,
  );

  return (
    <box
      cssClasses={["time"]}
      child={
        <button
          cssClasses={showCalender((show) => (show ? ["toggled"] : []))}
          child={<label onDestroy={() => time.drop()} label={time()} />}
          onClicked={() => showCalender.set(!showCalender.get())}
        />
      }
    />
  );
}
