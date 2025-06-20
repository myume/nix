import AstalNetwork from "gi://AstalNetwork";
import { bind, derive, exec, execAsync, Variable } from "astal";
import { Panel } from "./Panel";
import { networkPageName } from "../Pages/NetworkPage";

export const NetworkPanel = (setPageName: (name: string) => void) => {
  const network = AstalNetwork.get_default();
  const wired = bind(network, "wired");
  const wifi = bind(network, "wifi");
  const useWired = bind(network, "primary").as(
    (primary) => primary === AstalNetwork.Primary.WIRED,
  );

  const enabled = Variable(exec(["nmcli", "n"]) === "enabled");

  const networkState = derive([enabled, useWired, wifi, wired]);

  return networkState(([networkingEnabled, useWired, wifi, wired]) => (
    <Panel
      title={useWired ? "Ethernet" : "Wi-Fi"}
      description={
        useWired
          ? networkingEnabled
            ? wired &&
              (wired.internet === AstalNetwork.Internet.CONNECTED ||
                wired.internet === AstalNetwork.Internet.CONNECTING)
              ? "Connected"
              : "Disconnected"
            : "Disconnected"
          : bind(wifi, "ssid").as((ssid) => ssid ?? "Disconnected")
      }
      icon={useWired ? bind(wired, "iconName") : bind(wifi, "iconName")}
      enabled={enabled()}
      onEnable={() => {
        execAsync(["nmcli", "n", "on"]);
        enabled.set(true);
      }}
      onDisable={() => {
        execAsync(["nmcli", "n", "off"]);
        enabled.set(false);
      }}
      onExpand={() => setPageName(networkPageName)}
    />
  ));
};
