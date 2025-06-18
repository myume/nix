import { bind, derive } from "astal";
import AstalNotifd from "gi://AstalNotifd";

export default function Notifications() {
  const notifd = AstalNotifd.get_default();
  const notifications = bind(notifd, "notifications");
  const dnd = bind(notifd, "dontDisturb");

  return (
    <image
      tooltipText={notifications.as(
        (notifications) => `${notifications.length} unread notifications`,
      )}
      pixelSize={14}
      iconName={derive([notifications, dnd], (notifications, dnd) =>
        dnd
          ? "notification-disabled"
          : notifications.length > 0
            ? "notification-active"
            : "notification-inactive",
      )()}
    />
  );
}
