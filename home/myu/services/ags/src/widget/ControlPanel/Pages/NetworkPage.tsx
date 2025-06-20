import { Page } from "./Page";
import { derive, execAsync, GLib, Variable } from "astal";
import { PasswordEntry, ScrolledWindow } from "../../Gtk";
import { Gtk } from "astal/gtk4";

export const networkPageName = "network";

const columns = [
  "ssid",
  "mode",
  "chan",
  "rate",
  "signal",
  "bars",
  "security",
] as const;

type NetworkEntry = {
  [x in (typeof columns)[number]]: string;
};

const nmcliOutputToJson = (output: string) => {
  const seen = new Set();
  const parts = output
    .split("\n")
    .map((row) => row.split(":"))
    .filter((row) => {
      const ssid = row[0];
      const include = ssid !== "" && !seen.has(ssid);
      seen.add(ssid);
      return include;
    });

  const result: NetworkEntry[] = [];

  for (let entry of parts) {
    const entries = entry.map((val, i) => [columns[i], val]);
    result.push(Object.fromEntries(entries));
  }

  // idk if i should filter out meshes or anything else...nmtui doesn't so i'll follow it
  // result = items.filter(({ mode }) => mode.toLowerCase() !== "mesh");
  result.sort((a, b) => Number(b.signal) - Number(a.signal));

  return result;
};

const NetworkItem = ({
  network: { signal, ssid, security },
  selected,
}: {
  network: NetworkEntry;
  selected: Variable<string>;
}) => {
  const signalValue = Number(signal);
  let entry: Gtk.PasswordEntry | null = null;
  const passwdRequired = Variable(false);
  const connecting = Variable(false);
  return (
    <box
      cssClasses={selected((selectedSSid) => [
        "network-entry",
        selectedSSid === ssid ? "selected" : "",
      ])}
      orientation={Gtk.Orientation.VERTICAL}
      spacing={8}
    >
      <button
        onClicked={async () => {
          selected.set(ssid);
          entry?.grab_focus();

          connecting.set(true);
          try {
            await execAsync(["nmcli", "dev", "wifi", "connect", ssid]);
          } catch (e) {
            if (e instanceof GLib.Error) {
              const requiresPassword = /password .* not given/gi;
              if (requiresPassword.test(e.message)) {
                passwdRequired.set(true);
                connecting.set(false);
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
            <image
              visible={security !== ""}
              iconName={"object-locked-symbolic"}
            />
          </box>
        }
      />
      <PasswordEntry
        setup={(self) => {
          entry = self;
        }}
        showPeekIcon
        placeholderText={"Enter Password"}
        visible={derive(
          [selected, passwdRequired],
          (selectedSSid, passwdRequired) =>
            selectedSSid === ssid && security !== "" && passwdRequired,
        )()}
        onActivate={async (self) => {
          connecting.set(true);
          try {
            // need to do this first otherwise it might not work. idk why lol
            await execAsync(["nmcli", "connection", "delete", ssid]);

            await execAsync([
              "nmcli",
              "dev",
              "wifi",
              "connect",
              ssid,
              "password",
              self.text,
            ]);
          } catch (e) {
            logError(e);
          }
          connecting.set(false);
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
  networks: Variable<NetworkEntry[]>;
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
          {networks((nets) =>
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
  const networks = Variable<NetworkEntry[]>([]);
  const scanning = Variable(false);

  const refreshNetworks = async () => {
    if (scanning.get()) return;

    scanning.set(true);
    const output = await execAsync([
      "nmcli",
      "-t",
      "-f",
      columns.join(","),
      "dev",
      "wifi",
      "list",
    ]);
    const results = nmcliOutputToJson(output);
    networks.set(results);
    selectedSsid.set("");
    scanning.set(false);
  };

  refreshNetworks();

  currentPageName.subscribe((name) => {
    if (name === networkPageName) {
      refreshNetworks();
    }
  });

  return (
    <Page
      name={networkPageName}
      child={<NetworksList networks={networks} selected={selectedSsid} />}
      returnHome={returnHome}
    />
  );
};
