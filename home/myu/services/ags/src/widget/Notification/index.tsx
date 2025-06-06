import { bind } from "astal";
import { App, Astal, Gdk, Gtk } from "astal/gtk4";
import AstalNotifd from "gi://AstalNotifd";
import AstalApps from "gi://AstalApps";
import Notification from "./Notification";

export function Notifications(gdkmonitor: Gdk.Monitor) {
  const { TOP, RIGHT } = Astal.WindowAnchor;

  const notifd = AstalNotifd.get_default();
  const notifications = bind(notifd, "notifications");
  const apps = new AstalApps.Apps();

  return (
    <window
      visible={notifications.as((notifications) => notifications.length > 0)}
      namespace={"floating-notifications"}
      cssClasses={["bar"]}
      layer={Astal.Layer.TOP}
      exclusivity={Astal.Exclusivity.NORMAL}
      gdkmonitor={gdkmonitor}
      anchor={TOP | RIGHT}
      application={App}
      child={
        <box orientation={Gtk.Orientation.VERTICAL} spacing={8}>
          {notifications.as((notifs) => notifs.map(Notification))}
        </box>
      }
    />
  );
}
