import AstalWp from "gi://AstalWp";
import { bind } from "astal";

export default function AudioOutput() {
  const { defaultSpeaker: speaker } = AstalWp.get_default()!;

  return (
    <image
      tooltipText={bind(speaker, "volume").as(
        (volume) => `Volume at ${Math.round(volume * 100)}%`,
      )}
      iconName={bind(speaker, "volumeIcon")}
    />
  );
}
