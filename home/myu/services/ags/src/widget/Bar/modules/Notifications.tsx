import { createBinding, createComputed } from "ags";
import AstalNotifd from "gi://AstalNotifd";

export default function Notifications() {
  const notifd = AstalNotifd.get_default();
  const notifications = createBinding(notifd, "notifications");
  const dnd = createBinding(notifd, "dontDisturb");

  return (
    <image
      tooltipText={notifications.as(
        (notifications) => `${notifications.length} unread notifications`,
      )}
      pixelSize={14}
      iconName={createComputed([notifications, dnd], (notifications, dnd) =>
        dnd
          ? "notification-disabled"
          : notifications.length > 0
            ? "notification-active"
            : "notification-inactive",
      )}
    />
  );
}
