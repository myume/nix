import App from "ags/gtk4/app";
import { Astal, Gtk } from "ags/gtk4";
import AstalWp from "gi://AstalWp";
import BrightnessService from "../../Services/Brightness";
import { createBinding, createComputed, State, With } from "ags";
import AstalIO from "gi://AstalIO?version=0.1";
import { timeout } from "ags/time";

export const windowName = "OSD";

export enum OSDMode {
  Brightness,
  Volume,
}

export type OSDState = {
  timer: State<AstalIO.Time | null>;
  mode: State<OSDMode | null>;
};

export const OSD = ({ mode: [mode], timer: [timer, setTimer] }: OSDState) => {
  const { defaultSpeaker: speaker } = AstalWp.get_default()!;
  const brightness = BrightnessService.get_default();

  const source = createComputed([mode], (mode) => {
    switch (mode) {
      case OSDMode.Volume:
        return {
          value: createBinding(speaker, "volume"),
          icon: createBinding(speaker, "volumeIcon"),
          onChange: (slider: Astal.Slider) => {
            speaker.set_volume(slider.value);
          },
        };
      case OSDMode.Brightness:
      default:
        return {
          value: createBinding(brightness, "screen"),
          icon: createBinding(brightness, "icon_name"),
          onChange: (slider: Astal.Slider) => {
            brightness.screen = slider.value;
          },
        };
    }
  });

  return (
    <window
      name={windowName}
      namespace={windowName}
      cssClasses={[windowName]}
      layer={Astal.Layer.OVERLAY}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={Astal.WindowAnchor.RIGHT}
      application={App}
      onHoverEnter={() => {
        timer.get()?.cancel();
        setTimer(null);
      }}
      onHoverLeave={(self) => {
        if (!timer.get()) setTimer(timeout(3000, () => self?.hide()));
      }}
    >
      <box valign={Gtk.Align.CENTER}>
        <With value={source}>
          {({ icon, value, onChange }) => (
            <Gtk.Overlay
              setup={(self) =>
                self.add_overlay(
                  <image
                    cssClasses={["icon"]}
                    pixelSize={16}
                    iconName={icon}
                    canTarget={false}
                    valign={Gtk.Align.END}
                    marginBottom={16}
                  />,
                )
              }
              child={
                <slider
                  cssClasses={["slider"]}
                  min={0}
                  max={1}
                  value={value}
                  onChangeValue={onChange}
                  orientation={Gtk.Orientation.VERTICAL}
                  heightRequest={180}
                  inverted
                />
              }
            />
          )}
        </With>
      </box>
    </window>
  );
};
