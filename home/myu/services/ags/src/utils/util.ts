import { bind } from "astal";
import { Gdk, Gtk } from "astal/gtk4";
import AstalApps from "gi://AstalApps";
import AstalMpris from "gi://AstalMpris";

export function toTitleCase(str: string): string {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

export const getAppIcon = (player: AstalMpris.Player) => {
  const apps = new AstalApps.Apps();
  return bind(player, "entry").as(
    (entry) => apps.exact_query(entry)[0].iconName,
  );
};

export const hideOnClickAway =
  (hide: () => void) => (self: Gtk.Window, event: Gdk.ButtonEvent) => {
    if (
      event.get_button() === Gdk.BUTTON_PRIMARY ||
      event.get_button() === Gdk.BUTTON_SECONDARY
    ) {
      const [, x, y] = event.get_position();
      const allocation = (self.get_child()! as Gtk.Box).get_allocation();

      if (
        x < allocation.x ||
        x > allocation.x + allocation.width ||
        y < allocation.y ||
        y > allocation.y + allocation.height
      ) {
        hide();
      }
    }
  };

export function formatDuration(length: number) {
  const totalSeconds = Math.floor(length);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
}

export const secondsToTimeStamp = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);

  if (h === 0) {
    return `${m}m`;
  }

  return `${h}h ${m}m`;
};

export const wrapIndex = (index: number, length: number) =>
  ((index % length) + length) % length;
