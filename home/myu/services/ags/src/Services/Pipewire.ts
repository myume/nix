import GObject, { getter, register, setter } from "ags/gobject";
import { exec, execAsync } from "ags/process";

export type Client = {
  id: number;
  name: string;
  application: string;
  volume: number;
};

export type Sink = {
  id: number;
  name: string;
};

@register({ GTypeName: "PipeWireService" })
export default class PipeWire extends GObject.Object {
  static instance: PipeWire;
  static get_default() {
    if (!this.instance) {
      this.instance = new PipeWire();
    }

    return this.instance;
  }

  constructor() {
    super();
    this.fetch();
  }

  #default_sink: Sink | null = null;
  #sinks: Sink[] = [];
  #clients: Client[] = [];

  @getter(Object as any)
  get default_sink() {
    return this.#default_sink;
  }

  @setter(Object as any)
  set default_sink(source) {
    this.#default_sink = source;
    this.notify("default_sink");
  }

  @getter(Object as any)
  get sinks() {
    return this.#sinks;
  }

  @setter(Object as any)
  set sinks(sinks) {
    this.#sinks = sinks;
    this.notify("sinks");
  }

  @getter(Object as any)
  get clients() {
    return this.#clients;
  }

  @setter(Object as any)
  set clients(clients) {
    this.#sinks = clients;
    this.notify("clients");
  }

  fetch() {
    this.fetchSinks();
    this.fetchDefaultSink();
    this.fetchClients();
  }

  async fetchClients() {
    const output = await execAsync(`pw-dump`);
    if (!output) return [];
    const data = JSON.parse(output);
    this.#clients = data
      .filter(
        (o: any) =>
          o?.type === "PipeWire:Interface:Node" &&
          o?.info?.props?.["media.class"] === "Stream/Output/Audio" &&
          o?.info?.props?.["application.name"],
      )
      .map((o: any) => {
        return {
          id: o.id,
          name: o.info.props["media.name"],
          application: o.info.props["application.name"],
          volume: Math.floor(
            Number(
              exec(["wpctl", "get-volume", o.id.toString()]).replace(
                "Volume:",
                "",
              ),
            ) * 100,
          ),
        };
      });

    this.notify("clients");
  }

  setClientVolume(clientId: number, volume: number) {
    execAsync(["wpctl", "set-volume", clientId.toString(), `${volume}%`]);
  }

  async fetchSinks() {
    const output = await execAsync(`pw-dump`);
    if (!output) return [];
    const data = JSON.parse(output);
    this.#sinks = data
      .filter(
        (o: any) =>
          o?.type === "PipeWire:Interface:Node" &&
          o?.info?.props?.["media.class"] === "Audio/Sink",
      )
      .map((o: any) => ({
        id: o.id,
        name: o.info.props["node.description"],
      }));
    this.notify("sinks");
  }

  async fetchDefaultSink() {
    const output = await execAsync(`pw-dump`);
    if (!output) return;
    const data = JSON.parse(output);

    const metadata = data.find(
      (o: any) =>
        o?.type === "PipeWire:Interface:Metadata" &&
        o?.props?.["metadata.name"] === "default",
    );
    const defaultSinkName = metadata?.metadata?.find(
      (m: any) => m.key === "default.audio.sink",
    )?.value?.name;

    if (defaultSinkName) {
      const sink = data.find(
        (o: any) =>
          o?.type === "PipeWire:Interface:Node" &&
          o?.info?.props?.["node.name"] === defaultSinkName &&
          o?.info?.props?.["media.class"] === "Audio/Sink",
      );
      if (sink) {
        this.default_sink = {
          id: sink.id,
          name: sink.info.props["node.description"],
        };
        this.notify("default_sink");
        return;
      }
    }
    this.default_sink = null;
    this.notify("default_sink");
  }

  async setSink(sourceId: number) {
    await execAsync(["wpctl", "set-default", sourceId.toString()]);
    this.fetchDefaultSink();
  }
}
