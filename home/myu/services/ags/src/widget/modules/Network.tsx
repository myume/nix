import AstalNetwork from "gi://AstalNetwork";
import { bind } from "astal";

function Wired() {
  const network = AstalNetwork.get_default();
  const wired = bind(network, "wired");

  return (
    <box
      child={wired.as(
        (wired) =>
          wired && (
            <image
              visible={bind(wired, "internet").as(
                (internet) =>
                  internet === AstalNetwork.Internet.CONNECTED ||
                  internet === AstalNetwork.Internet.CONNECTING,
              )}
              tooltipText={bind(wired, "internet").as((internet) =>
                internet === AstalNetwork.Internet.CONNECTED
                  ? "Connected"
                  : internet === AstalNetwork.Internet.CONNECTING
                    ? "Connecting"
                    : "Disconnected",
              )}
              cssClasses={["Wired"]}
              iconName={bind(wired, "iconName")}
            />
          ),
      )}
    />
  );
}

function Wifi() {
  const network = AstalNetwork.get_default();
  const wifi = bind(network, "wifi");

  return (
    <box
      child={wifi.as(
        (wifi) =>
          wifi && (
            <image
              tooltipText={bind(wifi, "ssid").as(String)}
              cssClasses={["Wifi"]}
              iconName={bind(wifi, "iconName")}
            />
          ),
      )}
    />
  );
}

export default function Network() {
  return (
    <box cssClasses={["Network"]}>
      <Wired />
      <Wifi />
    </box>
  );
}
