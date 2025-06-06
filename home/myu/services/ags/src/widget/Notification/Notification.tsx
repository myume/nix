import { bind } from "astal";
import { Gtk } from "astal/gtk4";
import AstalNotifd from "gi://AstalNotifd";
import AstalApps from "gi://AstalApps";
import Pango from "gi://Pango?version=1.0";
import { capitalize } from "../../utils/util";

export default function Notification(notification: AstalNotifd.Notification) {
  const apps = new AstalApps.Apps();

  let appIcon = notification.appIcon;
  if (appIcon === "") {
    appIcon = apps.exact_query(notification.appName)[0]?.iconName ?? appIcon;
  }

  return (
    <box
      cssClasses={["notification"]}
      orientation={Gtk.Orientation.VERTICAL}
      widthRequest={256}
      spacing={8}
      hexpand
    >
      <box cssClasses={["notification-header"]} hexpand>
        <box halign={Gtk.Align.START} hexpand spacing={4}>
          <image iconName={appIcon} />
          <label
            label={bind(notification, "appName").as(capitalize)}
            xalign={0}
          />
        </box>
        <box halign={Gtk.Align.END}>
          <label
            label={bind(notification, "time").as((time) =>
              new Date(time).toLocaleString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }),
            )}
          />
          <button
            onClicked={() => notification.dismiss()}
            child={<image iconName={"window-close-symbolic"} />}
          />
        </box>
      </box>
      <box cssClasses={["separator"]} />
      <box
        orientation={Gtk.Orientation.VERTICAL}
        cssClasses={["notificiation-content"]}
        hexpand
      >
        <label
          cssClasses={["summary"]}
          label={bind(notification, "summary")}
          xalign={0}
          useMarkup
          wrap
        />
        <label
          cssClasses={["body"]}
          label={bind(notification, "body")}
          xalign={0}
          useMarkup
          wrap
          wrapMode={Pango.WrapMode.WORD_CHAR}
          widthChars={40}
          maxWidthChars={40}
        />
      </box>
    </box>
  );
}
