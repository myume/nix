import { bind, timeout } from "astal";
import { App, Astal, Gdk, Gtk } from "astal/gtk4";
import Notification from "./Notification";
import NotificationService from "../../Services/NotificationService";

const notifTimeout = 4000;
const windowName = "floating-notifications";

export function Notifications(gdkmonitor: Gdk.Monitor) {
  const { TOP, RIGHT } = Astal.WindowAnchor;

  const notificationService = NotificationService.get_default();
  const notifications = bind(notificationService, "notifications");

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
      child={
        <box orientation={Gtk.Orientation.VERTICAL} spacing={8}>
          {notifications.as((notifs) =>
            notifs.map((notification) => {
              return (
                <Notification
                  notification={notification}
                  hideNotification={() =>
                    timeout(notifTimeout, () => {
                      notificationService.hideNotification(notification);
                    })
                  }
                />
              );
            }),
          )}
        </box>
      }
    />
  );
}
