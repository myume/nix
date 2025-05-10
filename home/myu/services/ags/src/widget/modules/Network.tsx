import AstalNetwork from "gi://AstalNetwork";
import { bind, Binding } from "astal";

type NetworkProps<T> = {
  connection: Binding<T>;
  visible: boolean | Binding<boolean>;
};

function Wired({ connection, visible }: NetworkProps<AstalNetwork.Wired>) {
  return (
    <box
      visible={visible}
      child={connection.as(
        (wired) =>
          wired && (
            <image
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

function Wifi({ connection, visible }: NetworkProps<AstalNetwork.Wifi>) {
  return (
    <box
      visible={visible}
      child={connection.as(
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
  const network = AstalNetwork.get_default();
  const wired = bind(network, "wired");
  const wifi = bind(network, "wifi");
  const hasWiredConnection = bind(network, "wired").as(
    ({ internet }) =>
      internet === AstalNetwork.Internet.CONNECTED ||
      internet === AstalNetwork.Internet.CONNECTING,
  );

  return (
    <box cssClasses={["Network"]}>
      <Wired connection={wired} visible={hasWiredConnection} />
      <Wifi
        connection={wifi}
        visible={hasWiredConnection.as((visible) => !visible)}
      />
    </box>
  );
}
