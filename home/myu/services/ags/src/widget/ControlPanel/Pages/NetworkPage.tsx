import { Page } from "./Page";
import { PasswordEntry, ScrolledWindow } from "../../Gtk";
import { Gtk } from "ags/gtk4";
import NetworkManagerCliService, {
  NetworkEntry,
} from "../../../Services/NetworkManagerCliService";
import {
  Accessor,
  createBinding,
  createComputed,
  createState,
  For,
  State,
} from "ags";
import GLib from "gi://GLib";

export const networkPageName = "network";

const NetworkItem = ({
  network: { signal, ssid, security },
  selected: [selected, setSelected],
}: {
  network: NetworkEntry;
  selected: State<string>;
}) => {
  const networkManager = NetworkManagerCliService.get_default();
  const savedConnections = createBinding(networkManager, "saved_connections");
  const isCurrentConnection = createBinding(
    networkManager,
    "current_connection",
  ).as((current) => current === ssid);

  const connecting = createBinding(networkManager, "connecting");
  const isConnecting = createComputed(
    [connecting, selected],
    (connecting, selected) => connecting && selected === ssid,
  );
  let entry: Gtk.PasswordEntry | null = null;

  const [passwordRequired, setPasswordRequired] = createState(false);

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
            setPasswordRequired(false);
            setSelected(ssid);

            try {
              await networkManager.connectToNetwork(ssid);
            } catch (e) {
              if (e instanceof GLib.Error) {
                const requiresPassword = /password .* not given/gi;
                if (requiresPassword.test(e.message)) {
                  setPasswordRequired(true);
                  entry?.grab_focus();
                } else {
                  logError(e);
                }
              } else {
                logError(e);
              }
            }
          }}
        >
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
        </button>
        <box marginEnd={8}>
          <label
            visible={createComputed(
              [isCurrentConnection, isConnecting],
              (isCurrentConnection, isConnecting) =>
                isCurrentConnection && !isConnecting,
            )}
            label={"Connected"}
          />
          <label visible={isConnecting} label={"Connecting..."} />
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
        $={(self) => {
          entry = self;
        }}
        showPeekIcon
        placeholderText={"Enter Password"}
        visible={createComputed(
          [selected, passwordRequired],
          (selectedSSid, passwordRequired) =>
            selectedSSid === ssid && security !== "" && passwordRequired,
        )}
        onActivate={async (self) => {
          await networkManager.connectWithPassword(ssid, self.text);
          setPasswordRequired(false);
        }}
      />
    </box>
  );
};

const NetworksList = ({
  networks,
  selected,
}: {
  selected: Accessor<string>;
  networks: Accessor<NetworkEntry[]>;
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
          <For each={networks}>
            {(network) => <NetworkItem network={network} selected={selected} />}
          </For>
        </box>
      }
    />
  );
};

export const NetworkPage = ({
  returnHome,
  currentPageName: [currentPageName, setCurrentPageName],
}: {
  returnHome: () => void;
  currentPageName: State<string>;
}) => {
  const [selectedSsid, setSelectedSsid] = createState("");
  const networkManager = NetworkManagerCliService.get_default();

  const networks = createBinding(networkManager, "networks");
  const scanning = createBinding(networkManager, "scanning");

  currentPageName.subscribe(() => {
    if (currentPageName.get() === networkPageName) {
      networkManager.scan();
      setSelectedSsid("");
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
            setSelectedSsid("");
          }}
          iconName={"view-refresh"}
          visible={scanning.as((scanning) => !scanning)}
        />
      }
    />
  );
};
