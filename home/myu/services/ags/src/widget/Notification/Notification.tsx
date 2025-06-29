import { Gtk } from "ags/gtk4";
import AstalNotifd from "gi://AstalNotifd";
import AstalApps from "gi://AstalApps";
import Pango from "gi://Pango";
import { toTitleCase } from "../../utils/util";
import AstalIO from "gi://AstalIO";
import { createBinding, For, onCleanup } from "ags";
import GLib from "gi://GLib";

const urgencyToString = (urgency: AstalNotifd.Urgency) => {
  switch (urgency) {
    case AstalNotifd.Urgency.LOW:
      return "low";
    case AstalNotifd.Urgency.NORMAL:
      return "normal";
    case AstalNotifd.Urgency.CRITICAL:
      return "critical";
  }
};

type Props = {
  notification: AstalNotifd.Notification;
  hideNotification?: () => AstalIO.Time;
};

const timers: Map<number, AstalIO.Time> = new Map();

const cleanupExistingTimer = (id: number) => {
  const existingTimer = timers.get(id);
  if (existingTimer) {
    existingTimer.cancel();
    timers.delete(id);
  }
};

export default function Notification({
  notification,
  hideNotification,
}: Props) {
  const apps = new AstalApps.Apps();
  let appIcon = notification.appIcon;
  if (appIcon === "") {
    appIcon = apps.exact_query(notification.appName)[0]?.iconName ?? appIcon;
  }

  const widthChars = 20;
  const actions = createBinding(notification, "actions").as((actions) =>
    actions.map((action) => (
      <button
        cssClasses={["action", action.label]}
        label={action.label}
        onClicked={() => {
          notification.invoke(action.id);
          notification.dismiss();
        }}
      />
    )),
  );

  const notifd = AstalNotifd.get_default();

  if (hideNotification) {
    cleanupExistingTimer(notification.id);
    timers.set(notification.id, hideNotification());
  }

  onCleanup(() => {
    cleanupExistingTimer(notification.id);
  });

  return (
    <box
      cssClasses={["notification", urgencyToString(notification.urgency)]}
      orientation={Gtk.Orientation.VERTICAL}
      widthRequest={256}
      spacing={8}
      hexpand
    >
      {hideNotification ? (
        <Gtk.EventControllerMotion
          onEnter={() => {
            notifd.set_ignore_timeout(true);
            cleanupExistingTimer(notification.id);
          }}
          onLeave={() => {
            notifd.set_ignore_timeout(false);
            if (hideNotification) {
              cleanupExistingTimer(notification.id);
              timers.set(notification.id, hideNotification());
            }
          }}
        />
      ) : (
        <></>
      )}
      <box cssClasses={["notification-header"]} hexpand>
        <box halign={Gtk.Align.START} hexpand spacing={4}>
          <image visible={appIcon !== ""} iconName={appIcon} />
          <label
            label={createBinding(notification, "appName").as(toTitleCase)}
            xalign={0}
          />
        </box>
        <box halign={Gtk.Align.END} spacing={2}>
          <label
            label={createBinding(notification, "time").as((time) => {
              const datetime = GLib.DateTime.new_from_unix_local(time);
              let format = "%H:%M";
              if (datetime.compare(GLib.DateTime.new_now_local()) === 1) {
                format = "%d/%m " + format;
              }

              return datetime.format(format) ?? "";
            })}
          />
          <button
            cssClasses={["close-button"]}
            onClicked={() => notification.dismiss()}
          >
            <image
              cssClasses={["close-icon"]}
              iconName={"window-close-symbolic"}
            />
          </button>
        </box>
      </box>
      <box cssClasses={["separator"]} />
      <box cssClasses={["notificiation-content"]} spacing={8} hexpand>
        <image
          visible={createBinding(notification, "image").as(
            (image) => image !== null && image !== "",
          )}
          overflow={Gtk.Overflow.HIDDEN}
          cssClasses={["notification-image"]}
          file={createBinding(notification, "image")}
          pixelSize={64}
        />
        <box orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER}>
          <label
            cssClasses={["summary"]}
            label={createBinding(notification, "summary")}
            xalign={0}
            ellipsize={Pango.EllipsizeMode.END}
            widthChars={widthChars}
            maxWidthChars={widthChars}
          />
          <label
            cssClasses={["body"]}
            label={createBinding(notification, "body")}
            xalign={0}
            wrap
            wrapMode={Pango.WrapMode.WORD_CHAR}
            widthChars={widthChars}
            maxWidthChars={widthChars}
          />
        </box>
      </box>
      <box
        cssClasses={["actions"]}
        visible={actions.as((actions) => actions.length > 0)}
        spacing={4}
      >
        <For each={actions}>{(action) => action}</For>
      </box>
    </box>
  );
}
