import { GLib } from "astal";
import { Gtk } from "astal/gtk4";
import Variable from "astal/variable";

export default function Time({ format = "%a %b %d  %H:%M" }) {
  const time = Variable<string>("").poll(
    1000,
    () => GLib.DateTime.new_now_local().format(format)!,
  );

  return (
    <menubutton>
      <label onDestroy={() => time.drop()} label={time()} />
      <popover>
        <Gtk.Calendar />
      </popover>
    </menubutton>
  );
}
