import AstalNotifd from "gi://AstalNotifd";
import { Panel } from "./Panel";
import { bind } from "astal";

export const DoNoDisturb = () => {
  const notifd = AstalNotifd.get_default();
  const dnd = bind(notifd, "dontDisturb");

  return (
    <Panel
      title={"Do Not Disturb"}
      description={dnd.as((dnd) => (dnd ? "on" : "off"))}
      icon={dnd.as((dnd) =>
        dnd ? "notification-disabled" : "notification-inactive",
      )}
      enabled={dnd}
      onEnable={() => notifd.set_dont_disturb(true)}
      onDisable={() => notifd.set_dont_disturb(false)}
    />
  );
};
