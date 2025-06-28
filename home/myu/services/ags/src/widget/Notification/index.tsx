import App from "ags/gtk4/app";
import { Astal, Gdk, Gtk } from "ags/gtk4";
import Notification from "./Notification";
import NotificationService from "../../Services/NotificationService";
import { createBinding, For } from "ags";
import { timeout } from "ags/time";

const notifTimeout = 4000;
const windowName = "floating-notifications";

export function Notifications(gdkmonitor: Gdk.Monitor) {
  const { TOP, RIGHT } = Astal.WindowAnchor;

  const notificationService = NotificationService.get_default();
  const notifications = createBinding(notificationService, "notifications");

  return (
    <window
      visible={notifications.as((notifications) => notifications.length > 0)}
      name={windowName}
      namespace={windowName}
      cssClasses={[windowName]}
      layer={Astal.Layer.OVERLAY}
      exclusivity={Astal.Exclusivity.NORMAL}
      gdkmonitor={gdkmonitor}
      anchor={TOP | RIGHT}
      application={App}
    >
      <box orientation={Gtk.Orientation.VERTICAL} spacing={8}>
        <For each={notifications}>
          {(notification) => (
            <Notification
              notification={notification}
              hideNotification={() =>
                timeout(notifTimeout, () => {
                  notificationService.hideNotification(notification);
                })
              }
            />
          )}
        </For>
      </box>
    </window>
  );
}
