import { bind } from "astal";
import AstalBluetooth from "gi://AstalBluetooth";

export default function Bluetooth() {
  const bluetooth = AstalBluetooth.get_default();
  const devices = bind(bluetooth, "devices");

  return (
    <box>
      {devices.as((devices) =>
        devices
          .filter((device) => device.connected)
          .map((device) => (
            <image
              visible={bind(device, "connected")}
              iconName={bind(device, "icon")}
              tooltipText={bind(device, "name")}
            ></image>
          )),
      )}
    </box>
  );
}
