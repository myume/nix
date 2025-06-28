import AstalBluetooth from "gi://AstalBluetooth";
import { Panel } from "./Panel";
import { launchApp } from "../../Launcher/Plugins/AppSearch";
import AstalApps from "gi://AstalApps";
import { createBinding, createComputed } from "ags";

export const BluetoothPanel = () => {
  const apps = new AstalApps.Apps();
  const bluetooth = AstalBluetooth.get_default();
  const devices = createBinding(bluetooth, "devices");
  const isPowered = createBinding(bluetooth, "isPowered");
  const isConnected = createBinding(bluetooth, "isConnected");

  const bluetoothState = createComputed([isPowered, isConnected, devices]);

  return bluetoothState(([isPowered, isConnected, devices]) => {
    const connectedDevice = devices.filter((device) => device.connected)[0];

    return (
      <Panel
        title={"Bluetooth"}
        description={
          isConnected ? createBinding(connectedDevice, "name") : "Disconnected"
        }
        enabled={createBinding(bluetooth, "isPowered")}
        icon={
          isPowered
            ? isConnected
              ? createBinding(
                  devices.filter((device) => device.connected)[0],
                  "icon",
                )
              : "bluetooth-symbolic"
            : "bluetooth-disabled-symbolic"
        }
        onEnable={() => bluetooth.toggle()}
        onDisable={() => bluetooth.toggle()}
        onExpand={() => {
          launchApp(apps.exact_query("Bluetooth Manager")[0]);
        }}
      />
    );
  });
};
