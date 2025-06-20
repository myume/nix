import { Page } from "./Page";
import { bind, Binding, derive, GLib, Variable } from "astal";
import { PasswordEntry, ScrolledWindow } from "../../Gtk";
import { Gtk } from "astal/gtk4";
import NetworkManagerCliService, {
  NetworkEntry,
} from "../../../Services/NetworkManagerCliService";

export const networkPageName = "network";

const NetworkItem = ({
  network: { signal, ssid, security },
  selected,
}: {
  network: NetworkEntry;
  selected: Variable<string>;
}) => {
  const networkManager = NetworkManagerCliService.get_default();
  const signalValue = Number(signal);
  let entry: Gtk.PasswordEntry | null = null;
  const passwordRequired = Variable(false);
  const connecting = bind(networkManager, "connecting");
  return (
    <box
      cssClasses={selected((selectedSSid) => [
        "network-entry",
        selectedSSid === ssid ? "selected" : "",
      ])}
      orientation={Gtk.Orientation.VERTICAL}
      spacing={8}
    >
      <box spacing={8}>
        <button
          onClicked={async () => {
            selected.set(ssid);

            try {
              await networkManager.connectToNetwork(ssid);
            } catch (e) {
              if (e instanceof GLib.Error) {
                const requiresPassword = /password .* not given/gi;
                if (requiresPassword.test(e.message)) {
                  passwordRequired.set(true);
                  entry?.grab_focus();
                }
              }
            }
          }}
          child={
            <box spacing={8}>
              <image
                iconName={
                  signalValue >= 75
                    ? "network-wireless-signal-excellent"
                    : signalValue >= 50
                      ? "network-wireless-signal-ok"
                      : signalValue >= 25
                        ? "network-wireless-signal-weak"
                        : "network-wireless-signal-none"
                }
              />
              <label xalign={0} label={ssid} hexpand />
            </box>
          }
        />
        <label
          visible={derive(
            [connecting, selected],
            (connecting, selected) => connecting && selected === ssid,
          )()}
          label={"Connecting..."}
          marginEnd={8}
        />
        <button
          label={"󰕑 "}
          onClicked={() => networkManager.forgetNetwork(ssid)}
          tooltipText={"Forget Network"}
        />
        <image visible={security !== ""} iconName={"object-locked-symbolic"} />
      </box>
      <PasswordEntry
        setup={(self) => {
          entry = self;
        }}
        showPeekIcon
        placeholderText={"Enter Password"}
        visible={derive(
          [selected, passwordRequired],
          (selectedSSid, passwdRequired) =>
            selectedSSid === ssid && security !== "" && passwdRequired,
        )()}
        onActivate={async (self) => {
          await networkManager.connectWithPassword(ssid, self.text);
          passwordRequired.set(false);
        }}
      />
    </box>
  );
};

const NetworksList = ({
  networks,
  selected,
}: {
  selected: Variable<string>;
  networks: Binding<NetworkEntry[]>;
}) => {
  return (
    <ScrolledWindow
      vexpand
      hexpand
      child={
        <box
          cssClasses={["network-list"]}
          orientation={Gtk.Orientation.VERTICAL}
          spacing={8}
        >
          {networks.as((nets) =>
            nets.map((network) => {
              return <NetworkItem network={network} selected={selected} />;
            }),
          )}
        </box>
      }
    />
  );
};

export const NetworkPage = ({
  returnHome,
  currentPageName,
}: {
  returnHome: () => void;
  currentPageName: Variable<string>;
}) => {
  const selectedSsid = Variable("");
  const networkManager = NetworkManagerCliService.get_default();
  const networks = bind(networkManager, "networks");
  const scanning = bind(networkManager, "scanning");

  currentPageName.subscribe((name) => {
    if (name === networkPageName) {
      networkManager.scan();
      selectedSsid.set("");
    }
  });

  return (
    <Page
      name={networkPageName}
      child={scanning.as((scanning) =>
        scanning ? (
          <label hexpand vexpand label={"Scanning for networks..."} />
        ) : (
          <NetworksList networks={networks} selected={selectedSsid} />
        ),
      )}
      returnHome={returnHome}
      endWidget={
        <button
          onClicked={() => {
            networkManager.scan(true);
            selectedSsid.set("");
          }}
          iconName={"view-refresh"}
          visible={scanning.as((scanning) => !scanning)}
        />
      }
    />
  );
};
