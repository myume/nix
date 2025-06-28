import { Accessor, createBinding, With } from "ags";
import AstalNetwork from "gi://AstalNetwork";

type NetworkProps<T> = {
  connection: Accessor<T>;
  visible: boolean | Accessor<boolean>;
};

function Wired({ connection, visible }: NetworkProps<AstalNetwork.Wired>) {
  return (
    <box visible={visible}>
      <With value={connection}>
        {(wired) =>
          wired && (
            <image
              tooltipText={createBinding(wired, "internet").as((internet) =>
                internet === AstalNetwork.Internet.CONNECTED
                  ? "Connected"
                  : internet === AstalNetwork.Internet.CONNECTING
                    ? "Connecting"
                    : "Disconnected",
              )}
              cssClasses={["wired"]}
              iconName={createBinding(wired, "iconName")}
            />
          )
        }
      </With>
    </box>
  );
}

function Wifi({ connection, visible }: NetworkProps<AstalNetwork.Wifi>) {
  return (
    <box visible={visible}>
      <With value={connection}>
        {(wifi) =>
          wifi && (
            <image
              tooltipText={createBinding(wifi, "ssid").as(String)}
              cssClasses={["Wifi"]}
              iconName={createBinding(wifi, "iconName")}
            />
          )
        }
      </With>
    </box>
  );
}

export default function Network() {
  const network = AstalNetwork.get_default();
  const wired = createBinding(network, "wired");
  const wifi = createBinding(network, "wifi");
  const useWired = createBinding(network, "primary").as(
    (primary) => primary === AstalNetwork.Primary.WIRED,
  );

  return (
    <box cssClasses={["network"]}>
      <Wired connection={wired} visible={useWired} />
      <Wifi connection={wifi} visible={useWired.as((visible) => !visible)} />
    </box>
  );
}
