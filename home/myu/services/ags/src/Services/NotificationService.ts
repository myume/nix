import GObject, { getter, register, setter } from "ags/gobject";
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

  @getter(Object as any)
  get notifications() {
    return this.#notifications;
  }

  @setter(Object as any)
  set notifications(n) {
    this.#notifications = n;
    this.notify("notifications");
  }

  @getter(Object as any)
  get hidden_notifications() {
    return this.#hidden_notifications;
  }

  @setter(Object as any)
  set hidden_notifications(n) {
    this.#hidden_notifications = n;
    this.notify("hidden_notifications");
  }

  hideNotification(notif: AstalNotifd.Notification) {
    const hiddenNotif = this.#notifications.find(({ id }) => id === notif.id);
    if (hiddenNotif) {
      this.#notifications = this.#notifications.filter(
        ({ id }) => id !== notif.id,
      );
      this.notify("notifications");

      this.#hidden_notifications = [hiddenNotif, ...this.#hidden_notifications];
      this.notify("hidden_notifications");
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
          this.#notifications = [notif, ...this.#notifications];
          this.notify("notifications");
        }
      } else {
        this.#notifications = [notif, ...this.#notifications];
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
