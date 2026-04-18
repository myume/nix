import { createBinding, For } from "ags";
import AstalBluetooth from "gi://AstalBluetooth";

export default function Bluetooth() {
  const bluetooth = AstalBluetooth.get_default();
  const devices = createBinding(bluetooth, "devices").as((devices) =>
    devices.filter((device) => device.connected),
  );

  return (
    <box>
      <For each={devices}>
        {(device) => (
          <image
            visible={createBinding(device, "connected")}
            iconName={createBinding(device, "icon")}
            tooltipText={createBinding(device, "name")}
          ></image>
        )}
      </For>
    </box>
  );
}
