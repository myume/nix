import AstalNetwork from "gi://AstalNetwork";
import { Panel } from "./Panel";
import { networkPageName } from "../Pages/NetworkPage";
import { createBinding, createComputed, createState, With } from "ags";
import { exec, execAsync } from "ags/process";

export const NetworkPanel = (setPageName: (name: string) => void) => {
  const network = AstalNetwork.get_default();
  const wired = createBinding(network, "wired");
  const wifi = createBinding(network, "wifi");
  const useWired = createBinding(network, "primary").as(
    (primary) => primary === AstalNetwork.Primary.WIRED,
  );

  const [enabled, setEnabled] = createState(exec(["nmcli", "n"]) === "enabled");
  const networkState = createComputed([enabled, useWired, wifi, wired]);

  return (
    <With value={networkState}>
      {([networkingEnabled, useWired, wifi, wired]) => (
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
              : createBinding(wifi, "ssid").as((ssid) => ssid ?? "Disconnected")
          }
          icon={
            useWired
              ? createBinding(wired, "iconName")
              : createBinding(wifi, "iconName")
          }
          enabled={enabled}
          onEnable={() => {
            execAsync(["nmcli", "n", "on"]);
            setEnabled(true);
          }}
          onDisable={() => {
            execAsync(["nmcli", "n", "off"]);
            setEnabled(false);
          }}
          onExpand={() => setPageName(networkPageName)}
        />
      )}
    </With>
  );
};
