import { execAsync, GObject, property, register } from "astal";
import AstalNetwork from "gi://AstalNetwork";

export const columns = [
  "ssid",
  "mode",
  "chan",
  "rate",
  "signal",
  "bars",
  "security",
] as const;

export type NetworkEntry = Omit<
  {
    [x in (typeof columns)[number]]: string;
  },
  "signal"
> & { signal: number };

@register({ GTypeName: "NetworkManagerCliService" })
export default class NetworkManagerCliService extends GObject.Object {
  static astalNetwork = AstalNetwork.get_default();

  static instance: NetworkManagerCliService;
  static get_default() {
    if (!this.instance) this.instance = new NetworkManagerCliService();

    return this.instance;
  }

  constructor() {
    super();
    NetworkManagerCliService.astalNetwork.wifi.connect(
      "state-changed",
      ({ ssid }) => {
        this.#current_connection = ssid;
        this.notify("current_connection");

        this.#networks = this.orderNetworks();
        this.notify("networks");
      },
    );
  }

  #scanning = false;
  #connecting = false;
  #networks: NetworkEntry[] = [];
  #saved_connections: Set<string> = new Set();
  #current_connection: string = NetworkManagerCliService.astalNetwork.wifi.ssid;

  @property()
  get networks() {
    return this.#networks;
  }

  set networks(nets) {
    this.#networks = nets;
    this.notify("networks");
  }

  @property()
  get scanning() {
    return this.#scanning;
  }

  set scanning(scanning) {
    this.#scanning = scanning;
    this.notify("scanning");
  }

  @property()
  get connecting() {
    return this.#connecting;
  }

  set connecting(connecting) {
    this.#connecting = connecting;
    this.notify("connecting");
  }

  @property()
  get saved_connections() {
    return this.#saved_connections;
  }

  set saved_connections(connections) {
    this.#saved_connections = connections;
    this.notify("saved_connections");
  }

  @property()
  get current_connection() {
    return this.#current_connection;
  }

  set current_connection(ssid) {
    this.#current_connection = ssid;
    this.notify("current_connection");
  }

  private nmcliOutputToJson = (output: string) => {
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
      const entries = entry.map((val, i) => {
        const column = columns[i];
        return [column, column === "signal" ? Number(val) : val];
      });
      result.push(Object.fromEntries(entries));
    }

    // idk if i should filter out meshes or anything else...nmtui doesn't so i'll follow it
    // result = items.filter(({ mode }) => mode.toLowerCase() !== "mesh");
    result.sort((a, b) => b.signal - a.signal);

    return result;
  };

  forgetNetwork = async (ssid: string) => {
    await execAsync(["nmcli", "connection", "delete", ssid]);
    await this.scanSavedConnections();
  };

  scan = async (rescan: boolean = false) => {
    if (this.#scanning) return;

    this.#scanning = true;
    this.notify("scanning");

    const cmd = ["nmcli", "-t", "-f", columns.join(","), "dev", "wifi", "list"];

    if (rescan) {
      cmd.push("--rescan");
      cmd.push("yes");
    }

    const output = await execAsync(cmd);

    this.#networks = this.nmcliOutputToJson(output);

    // needs to scan saved connections before ordering the networks
    await this.scanSavedConnections();

    this.#networks = this.orderNetworks();
    this.notify("networks");

    this.#scanning = false;
    this.notify("scanning");
  };

  private orderNetworks = () => {
    const current: NetworkEntry[] = [];
    const saved: NetworkEntry[] = [];
    const rest: NetworkEntry[] = [];

    this.#networks.forEach((net) => {
      if (net.ssid === this.#current_connection) {
        current.push(net);
      } else if (this.#saved_connections.has(net.ssid)) {
        saved.push(net);
      } else {
        rest.push(net);
      }
    });

    return [...current, ...saved, ...rest];
  };

  connectToNetwork = async (ssid: string) => {
    if (this.#connecting) return;

    try {
      this.#connecting = true;
      this.notify("connecting");
      await execAsync(["nmcli", "dev", "wifi", "connect", ssid]);
    } catch (e) {
      // i remember i saw something like this once and thought why tf would anybody do this
      // 3 years later, here we are...
      //
      // doing this because i don't actually want to handle the error here,
      // but i do want to set connecting to false at the end anyway.
      throw e;
    } finally {
      this.#connecting = false;
      this.notify("connecting");
      this.scanSavedConnections();
    }
  };

  connectWithPassword = async (ssid: string, password: string) => {
    if (this.#connecting) return;

    this.#connecting = true;
    this.notify("connecting");
    try {
      // need to do this first otherwise it might not work. idk why lol
      await this.forgetNetwork(ssid);
    } catch (e) {
      // don't need to handle if can't forget
    }

    try {
      await execAsync([
        "nmcli",
        "dev",
        "wifi",
        "connect",
        ssid,
        "password",
        password,
      ]);
    } catch (e) {
      logError(e);
    }
    this.#connecting = false;
    this.notify("connecting");

    this.scanSavedConnections();
  };

  scanSavedConnections = async () => {
    const output = await execAsync([
      "nmcli",
      "-t",
      "-f",
      "NAME",
      "connection",
      "show",
    ]);
    this.saved_connections = new Set(output.split("\n"));
    this.notify("saved_connections");
  };
}
