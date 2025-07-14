import AstalWp from "gi://AstalWp";
import { Slider } from "./Slider";
import { createBinding } from "ags";
import { audioPageName } from "../Pages/AudioPage";

export const VolumeSlider = (setPageName: (name: string) => void) => {
  const { defaultSpeaker: speaker } = AstalWp.get_default()!;

  return (
    <Slider
      min={0}
      max={1}
      value={createBinding(speaker, "volume")}
      icon={createBinding(speaker, "volumeIcon")}
      onChange={({ value }) => {
        if (value.toFixed(2) !== speaker.volume.toFixed(2)) {
          speaker.set_volume(+value.toFixed(2));
        }
      }}
      onExpand={() => setPageName(audioPageName)}
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
      onChange={({ value }) => {
        mic.set_volume(value);
      }}
    />
  );
};
