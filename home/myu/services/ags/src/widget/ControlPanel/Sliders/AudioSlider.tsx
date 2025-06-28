import AstalWp from "gi://AstalWp";
import { Slider } from "./Slider";
import { createBinding } from "ags";

export const VolumeSlider = () => {
  const { defaultSpeaker: speaker } = AstalWp.get_default()!;

  return (
    <Slider
      min={0}
      max={1}
      value={createBinding(speaker, "volume")}
      icon={createBinding(speaker, "volumeIcon")}
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
      value={createBinding(mic, "volume")}
      icon={createBinding(mic, "volumeIcon")}
      onChange={(self) => {
        mic.set_volume(self.value);
      }}
    />
  );
};
