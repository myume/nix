import { Page } from "./Page";
import { Binding, timeout, Variable } from "astal";
import { ScrolledWindow } from "../../Gtk";
import { Gtk } from "astal/gtk4";

export const networkPageName = "Network";

const columns = [
  "ssid",
  "mode",
  "chan",
  "rate",
  "signal",
  "bars",
  "security",
] as const;

type NetworkItem = {
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

  const result: NetworkItem[] = [];

  for (let entry of parts) {
    const entries = entry.map((val, i) => [columns[i], val]);
    result.push(Object.fromEntries(entries));
  }

  // idk if i should filter out meshes or anything else...nmtui doesn't so i'll follow it
  // result = items.filter(({ mode }) => mode.toLowerCase() !== "mesh");
  result.sort((a, b) => Number(b.signal) - Number(a.signal));

  return result;
};

const NetworksList = ({ networks }: { networks: Binding<NetworkItem[]> }) => {
  return (
    <ScrolledWindow
      vexpand
      hexpand
      child={
        <box orientation={Gtk.Orientation.VERTICAL}>
          {networks.as((networks) =>
            networks.map(({ ssid, bars, security }) => (
              <box orientation={Gtk.Orientation.VERTICAL}>
                <label>{ssid}</label>
              </box>
            )),
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
  const networks = Variable<NetworkItem[]>([]).poll(
    2000,
    ["nmcli", "-t", "-f", columns.join(","), "dev", "wifi", "list"],
    nmcliOutputToJson,
  );

  // initially poll a couple of times for faster/more responsive interface
  timeout(5000, () => networks.stopPoll());

  // only polling when switched to networks page
  currentPageName.subscribe((name) => {
    if (name === networkPageName) {
      networks.startPoll();
    } else {
      networks.stopPoll();
    }
  });

  return (
    <Page
      name={networkPageName}
      child={<NetworksList networks={networks()} />}
      returnHome={returnHome}
    />
  );
};
