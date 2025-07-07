import { Gtk } from "ags/gtk4";
import { Page } from "./Page";
import { Accessor, createBinding, For, onCleanup } from "ags";
import PipeWire from "../../../Services/Pipewire";
import Pango from "gi://Pango";
import { toTitleCase } from "../../../utils/util";
import AstalApps from "gi://AstalApps";

export const audioPageName = "audio";

const AppMixer = () => {
  const pipewire = PipeWire.get_default();
  const clients = createBinding(pipewire, "clients");
  const apps = new AstalApps.Apps();

  return (
    <Gtk.ScrolledWindow>
      <box class="mixer" spacing={12}>
        <For each={clients}>
          {({ id, name, application, volume }) => (
            <box hexpand spacing={8} orientation={Gtk.Orientation.VERTICAL}>
              <slider
                class="mixer-slider"
                min={0}
                max={100}
                value={volume}
                onChangeValue={({ value }) => {
                  pipewire.setClientVolume(id, value);
                }}
                vexpand
                orientation={Gtk.Orientation.VERTICAL}
                inverted
              />
              <image
                iconName={apps.fuzzy_query(application)[0].iconName}
                pixelSize={22}
                tooltipText={toTitleCase(name)}
              />
            </box>
          )}
        </For>
      </box>
    </Gtk.ScrolledWindow>
  );
};

const SinkSelector = () => {
  const pipewire = PipeWire.get_default();
  const defaultSink = createBinding(pipewire, "default_sink");
  const sinks = createBinding(pipewire, "sinks");

  return (
    <menubutton valign={Gtk.Align.START}>
      <label
        label={defaultSink((src) => src?.name ?? "unknown")}
        ellipsize={Pango.EllipsizeMode.END}
        widthChars={30}
        maxWidthChars={30}
      />
      <popover>
        <box class="sinks" orientation={Gtk.Orientation.VERTICAL}>
          <For each={sinks}>
            {({ id, name }) => (
              <button onClicked={() => pipewire.setSink(id)}>
                <label
                  label={name}
                  ellipsize={Pango.EllipsizeMode.END}
                  widthChars={30}
                  maxWidthChars={30}
                />
              </button>
            )}
          </For>
        </box>
      </popover>
    </menubutton>
  );
};

export const AudioPage = ({
  returnHome,
  currentPageName,
}: {
  returnHome: () => void;
  currentPageName: Accessor<String>;
}) => {
  const pipewire = PipeWire.get_default();

  const dispose = currentPageName.subscribe(() => {
    if (currentPageName.get() === audioPageName) {
      pipewire.fetch();
    }
  });

  onCleanup(() => {
    dispose();
  });

  return (
    <Page
      name={audioPageName}
      child={
        <box
          cssClasses={[audioPageName]}
          hexpand
          vexpand
          orientation={Gtk.Orientation.VERTICAL}
        >
          <AppMixer />
          <SinkSelector />
        </box>
      }
      returnHome={returnHome}
    />
  );
};
