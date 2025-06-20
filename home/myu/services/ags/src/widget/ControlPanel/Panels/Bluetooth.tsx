import AstalBluetooth from "gi://AstalBluetooth";
import { Panel } from "./Panel";
import { bind, derive } from "astal";
import { launchApp } from "../../Launcher/Plugins/AppSearch";
import AstalApps from "gi://AstalApps";

export const BluetoothPanel = () => {
  const apps = new AstalApps.Apps();
  const bluetooth = AstalBluetooth.get_default();
  const devices = bind(bluetooth, "devices");
  const isPowered = bind(bluetooth, "isPowered");
  const isConnected = bind(bluetooth, "isConnected");

  const bluetoothState = derive([isPowered, isConnected, devices]);

  return bluetoothState(([isPowered, isConnected, devices]) => {
    const connectedDevice = devices.filter((device) => device.connected)[0];

    return (
      <Panel
        title={"Bluetooth"}
        description={
          isConnected ? bind(connectedDevice, "name") : "Disconnected"
        }
        enabled={bind(bluetooth, "isPowered")}
        icon={
          isPowered
            ? isConnected
              ? bind(devices.filter((device) => device.connected)[0], "icon")
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
