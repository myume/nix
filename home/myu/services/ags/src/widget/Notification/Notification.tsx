import { AstalIO, bind, GLib } from "astal";
import { Gtk } from "astal/gtk4";
import AstalNotifd from "gi://AstalNotifd";
import AstalApps from "gi://AstalApps";
import Pango from "gi://Pango?version=1.0";
import { toTitleCase } from "../../utils/util";

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
  const actions = bind(notification, "actions").as((actions) =>
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
  let timer: AstalIO.Time | null = null;

  return (
    <box
      cssClasses={["notification", urgencyToString(notification.urgency)]}
      orientation={Gtk.Orientation.VERTICAL}
      widthRequest={256}
      spacing={8}
      onHoverEnter={() => {
        notifd.set_ignore_timeout(true);
        timer?.cancel();
        timer = null;
      }}
      onHoverLeave={() => {
        notifd.set_ignore_timeout(false);
        if (hideNotification) {
          timer = hideNotification();
        }
      }}
      setup={() => {
        if (hideNotification) {
          timer = hideNotification();
        }
      }}
      hexpand
    >
      <box cssClasses={["notification-header"]} hexpand>
        <box halign={Gtk.Align.START} hexpand spacing={4}>
          <image visible={appIcon !== ""} iconName={appIcon} />
          <label
            label={bind(notification, "appName").as(toTitleCase)}
            xalign={0}
          />
        </box>
        <box halign={Gtk.Align.END} spacing={2}>
          <label
            label={bind(notification, "time").as((time) => {
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
            child={
              <image
                cssClasses={["close-icon"]}
                iconName={"window-close-symbolic"}
              />
            }
          />
        </box>
      </box>
      <box cssClasses={["separator"]} />
      <box cssClasses={["notificiation-content"]} spacing={8} hexpand>
        <image
          visible={bind(notification, "image").as(
            (image) => image !== null && image !== "",
          )}
          overflow={Gtk.Overflow.HIDDEN}
          cssClasses={["notification-image"]}
          file={bind(notification, "image")}
          pixelSize={64}
        />
        <box orientation={Gtk.Orientation.VERTICAL} valign={Gtk.Align.CENTER}>
          <label
            cssClasses={["summary"]}
            label={bind(notification, "summary")}
            xalign={0}
            ellipsize={Pango.EllipsizeMode.END}
            widthChars={widthChars}
            maxWidthChars={widthChars}
          />
          <label
            cssClasses={["body"]}
            label={bind(notification, "body")}
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
        {actions}
      </box>
    </box>
  );
}
