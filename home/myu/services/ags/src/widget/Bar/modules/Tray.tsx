import { bind } from "astal";
import AstalTray from "gi://AstalTray";

export default function Tray() {
  const tray = AstalTray.get_default();

  return (
    <box cssClasses={["Tray"]}>
      {bind(tray, "items").as((items) =>
        items.map((item) => (
          <menubutton
            setup={(self) =>
              // makes the menu actually work
              self.insert_action_group("dbusmenu", item.actionGroup)
            }
            tooltipMarkup={bind(item, "tooltipMarkup")}
            menuModel={bind(item, "menuModel")}
            child={<image gicon={bind(item, "gicon")} />}
          />
        )),
      )}
    </box>
  );
}
