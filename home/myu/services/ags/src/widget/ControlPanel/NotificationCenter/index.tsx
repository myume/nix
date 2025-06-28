import NotificationService from "../../../Services/NotificationService";
import Notification from "../../Notification/Notification";
import { Gtk } from "ags/gtk4";
import { createBinding, createComputed, For, With } from "ags";

export const notificationCenterName = "notification-center";

export const NotificationCenter = () => {
  const notificationService = NotificationService.get_default();
  const allNotifications = createComputed(
    [
      createBinding(notificationService, "notifications"),
      createBinding(notificationService, "hidden_notifications"),
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
      <box heightRequest={360}>
        <With value={allNotifications}>
          {(notifications) =>
            notifications.length > 0 ? (
              <Gtk.ScrolledWindow
                cssClasses={["scrolled-window"]}
                max_content_height={360}
                vexpand
                hexpand
              >
                <box orientation={Gtk.Orientation.VERTICAL} spacing={10}>
                  <For each={allNotifications}>
                    {(notification) => (
                      <Notification notification={notification} />
                    )}
                  </For>
                </box>
              </Gtk.ScrolledWindow>
            ) : (
              <label xalign={0.5} hexpand label={"No Notifications"} />
            )
          }
        </With>
      </box>
      <button
        cssClasses={["clear-button"]}
        visible={allNotifications((notifications) => notifications.length > 0)}
        halign={Gtk.Align.END}
        onClicked={() => {
          allNotifications
            .get()
            .forEach((notification) => notification.dismiss());
        }}
      >
        <box spacing={2}>
          <image iconName={"edit-clear-list"} />
          <label>Clear</label>
        </box>
      </button>
    </box>
  );
};
