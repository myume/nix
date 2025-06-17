import { bind, derive } from "astal";
import { ScrolledWindow } from "../../Gtk";
import NotificationService from "../../Services/NotificationService";
import Notification from "../../Notification/Notification";
import { Gtk } from "astal/gtk4";

export const NotificationCenter = () => {
  const notificationService = NotificationService.get_default();
  const allNotifications = derive(
    [
      bind(notificationService, "notifications"),
      bind(notificationService, "hidden_notifications"),
    ],
    (unresolved, hidden) => unresolved.concat(hidden),
  );

  return (
    <box
      cssClasses={["notifications"]}
      orientation={Gtk.Orientation.VERTICAL}
      spacing={12}
      visible={allNotifications((notifications) => notifications.length > 0)}
    >
      <box cssClasses={["separator"]} />
      <ScrolledWindow
        cssClasses={["scrolled-window"]}
        heightRequest={360}
        max_content_height={360}
        child={
          <box orientation={Gtk.Orientation.VERTICAL} spacing={10}>
            {allNotifications((notifications) =>
              notifications.map((notification) => (
                <Notification notification={notification} />
              )),
            )}
          </box>
        }
      />
      <button
        cssClasses={["clear-button"]}
        halign={Gtk.Align.END}
        onClicked={() => {
          allNotifications
            .get()
            .forEach((notification) => notification.dismiss());
        }}
        child={
          <box spacing={2}>
            <image iconName={"edit-clear-list"} />
            <label>Clear</label>
          </box>
        }
      />
    </box>
  );
};
