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
  const savedConnections = bind(networkManager, "saved_connections");
  const isCurrentConnection = bind(networkManager, "current_connection").as(
    (current) => current === ssid,
  );

  const connecting = bind(networkManager, "connecting");
  const isConnecting = derive(
    [connecting, selected],
    (connecting, selected) => connecting && selected === ssid,
  );
  let entry: Gtk.PasswordEntry | null = null;

  const passwordRequired = Variable(false);

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
            passwordRequired.set(false);
            selected.set(ssid);

            try {
              await networkManager.connectToNetwork(ssid);
            } catch (e) {
              if (e instanceof GLib.Error) {
                const requiresPassword = /password .* not given/gi;
                if (requiresPassword.test(e.message)) {
                  passwordRequired.set(true);
                  entry?.grab_focus();
                } else {
                  logError(e);
                }
              } else {
                logError(e);
              }
            }
          }}
          child={
            <box spacing={8}>
              <image
                iconName={
                  signal >= 75
                    ? "network-wireless-signal-excellent"
                    : signal >= 50
                      ? "network-wireless-signal-ok"
                      : signal >= 25
                        ? "network-wireless-signal-weak"
                        : "network-wireless-signal-none"
                }
              />
              <label xalign={0} label={ssid} hexpand />
            </box>
          }
        />
        <box marginEnd={8}>
          <label
            visible={derive(
              [isCurrentConnection, isConnecting],
              (isCurrentConnection, isConnecting) =>
                isCurrentConnection && !isConnecting,
            )()}
            label={"Connected"}
          />
          <label visible={isConnecting()} label={"Connecting..."} />
        </box>
        <button
          visible={savedConnections.as((connections) => connections.has(ssid))}
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
          (selectedSSid, passwordRequired) =>
            selectedSSid === ssid && security !== "" && passwordRequired,
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
