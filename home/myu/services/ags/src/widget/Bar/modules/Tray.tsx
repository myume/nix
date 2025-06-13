import { bind } from "astal";
import AstalTray from "gi://AstalTray";

export default function Tray() {
  const tray = AstalTray.get_default();
  const items = bind(tray, "items");
  const hasItems = items.as((items) => items.length > 0);

  return (
    <box
      visible={hasItems}
      cssClasses={["Tray"]}
      marginEnd={hasItems.as((hasItems) => (hasItems ? 4 : 0))}
      spacing={4}
    >
      {items.as((items) =>
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
