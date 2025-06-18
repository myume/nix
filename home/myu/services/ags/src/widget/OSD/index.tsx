import { AstalIO, bind, derive, timeout, Variable } from "astal";
import { App, Astal, Gtk } from "astal/gtk4";
import AstalWp from "gi://AstalWp";
import BrightnessService from "../Services/Brightness";
import { Overlay } from "astal/gtk4/widget";

export const windowName = "OSD";

export enum OSDMode {
  Brightness,
  Volume,
}

export type OSDState = {
  timer: Variable<AstalIO.Time | null>;
  mode: Variable<OSDMode | null>;
};

export const OSD = ({ mode, timer }: OSDState) => {
  const { defaultSpeaker: speaker } = AstalWp.get_default()!;
  const brightness = BrightnessService.get_default();

  const source = derive([mode], (mode) => {
    switch (mode) {
      case OSDMode.Volume:
        return {
          value: bind(speaker, "volume"),
          icon: bind(speaker, "volumeIcon"),
          onChange: (slider: Astal.Slider) => {
            speaker.set_volume(slider.value);
          },
        };
      case OSDMode.Brightness:
      default:
        return {
          value: bind(brightness, "screen"),
          icon: bind(brightness, "icon_name"),
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
        timer.set(null);
      }}
      onHoverLeave={(self) => {
        if (!timer.get()) timer.set(timeout(3000, () => self?.hide()));
      }}
      child={
        <box
          valign={Gtk.Align.CENTER}
          child={source(({ icon, value, onChange }) => (
            <Overlay
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
          ))}
        />
      }
    />
  );
};
