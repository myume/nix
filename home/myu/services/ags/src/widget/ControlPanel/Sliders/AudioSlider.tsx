import AstalWp from "gi://AstalWp";
import { bind } from "astal";
import { Slider } from "./Slider";

export const VolumeSlider = () => {
  const { defaultSpeaker: speaker } = AstalWp.get_default()!;

  return (
    <Slider
      min={0}
      max={1}
      value={bind(speaker, "volume")}
      icon={bind(speaker, "volumeIcon")}
      onChange={(self) => {
        speaker.set_volume(self.value);
      }}
    />
  );
};

export const MicSlider = () => {
  const { defaultMicrophone: mic } = AstalWp.get_default()!;

  return (
    <Slider
      min={0}
      max={1}
      value={bind(mic, "volume")}
      icon={bind(mic, "volumeIcon")}
      onChange={(self) => {
        mic.set_volume(self.value);
      }}
    />
  );
};
