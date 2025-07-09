import { createBinding, For } from "ags";
import AstalTray from "gi://AstalTray";

export default function Tray() {
  const tray = AstalTray.get_default();
  const items = createBinding(tray, "items");
  const hasItems = items.as((items) => items.length > 0);

  return (
    <box
      visible={hasItems}
      cssClasses={["Tray"]}
      marginEnd={hasItems.as((hasItems) => (hasItems ? 2 : 0))}
      spacing={6}
    >
      <For each={items}>
        {(item) => (
          <menubutton
            $={(self) =>
              // makes the menu actually work
              self.insert_action_group("dbusmenu", item.actionGroup)
            }
            tooltipMarkup={createBinding(item, "tooltipMarkup")}
            menuModel={createBinding(item, "menuModel")}
          >
            <image gicon={createBinding(item, "gicon")} />
          </menubutton>
        )}
      </For>
    </box>
  );
}
