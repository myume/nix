import { bind, derive } from "astal";
import { ScrolledWindow } from "../../Gtk";
import NotificationService from "../../../Services/NotificationService";
import Notification from "../../Notification/Notification";
import { Gtk } from "astal/gtk4";

export const notificationCenterName = "notification-center";

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
      name={notificationCenterName}
      cssClasses={["notifications", "page"]}
      orientation={Gtk.Orientation.VERTICAL}
      spacing={12}
    >
      <box cssClasses={["separator"]} />
      <box
        heightRequest={360}
        child={allNotifications((notifications) =>
          notifications.length > 0 ? (
            <ScrolledWindow
              cssClasses={["scrolled-window"]}
              max_content_height={360}
              vexpand
              hexpand
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
          ) : (
            <label xalign={0.5} hexpand label={"No Notifications"} />
          ),
        )}
      />
      <button
        cssClasses={["clear-button"]}
        visible={allNotifications((notifications) => notifications.length > 0)}
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
