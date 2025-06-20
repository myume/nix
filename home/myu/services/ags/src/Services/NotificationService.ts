import { GObject, property, register } from "astal";
import AstalNotifd from "gi://AstalNotifd";

@register({ GTypeName: "NotificationService" })
export default class NotificationService extends GObject.Object {
  static instance: NotificationService;
  static get_default() {
    if (!this.instance) this.instance = new NotificationService();

    return this.instance;
  }

  #notifd = AstalNotifd.get_default();

  #notifications: AstalNotifd.Notification[] = [];
  #hidden_notifications = this.#notifd.notifications;

  @property()
  get notifications() {
    return this.#notifications;
  }

  set notifications(n) {
    this.#notifications = n;
    this.notify("notifications");
  }

  @property()
  get hidden_notifications() {
    return this.#hidden_notifications;
  }

  set hidden_notifications(n) {
    this.#hidden_notifications = n;
    this.notify("hidden_notifications");
  }

  hideNotification(notif: AstalNotifd.Notification) {
    const hiddenNotif = this.#notifications.find(({ id }) => id === notif.id);
    if (hiddenNotif) {
      this.#hidden_notifications.push(hiddenNotif);
      this.notify("hidden_notifications");

      this.#notifications = this.#notifications.filter(
        ({ id }) => id !== notif.id,
      );
      this.notify("notifications");
    }
  }

  constructor() {
    super();

    this.#notifd.connect("notified", (src, id, replaced) => {
      const notif = src.notifications.find(
        (notification) => notification.id === id,
      );
      if (!notif) return;

      if (replaced) {
        const i = this.#notifications.findIndex(({ id }) => id === notif.id);

        // replaced notification in non-hidden
        if (i >= 0) {
          this.#notifications[i] = notif;
          this.notify("notifications");
        } else {
          this.#hidden_notifications = this.#hidden_notifications.filter(
            (hidden) => hidden.id !== id,
          );
          this.notify("hidden_notifications");
          this.notifications.push(notif);
          this.notify("notifications");
        }
      } else {
        this.#notifications.push(notif);
        this.notify("notifications");
      }
    });

    this.#notifd.connect("resolved", (_, id) => {
      this.#hidden_notifications = this.#hidden_notifications.filter(
        (hidden) => hidden.id !== id,
      );
      this.notify("hidden_notifications");
      this.#notifications = this.#notifications.filter(
        (notification) => notification.id !== id,
      );
      this.notify("notifications");
    });
  }
}
