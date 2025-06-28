import { createBinding } from "ags";
import AstalWp from "gi://AstalWp";

export default function AudioOutput() {
  const { defaultSpeaker: speaker } = AstalWp.get_default()!;

  return (
    <image
      tooltipText={createBinding(speaker, "volume").as(
        (volume) => `Volume at ${Math.round(volume * 100)}%`,
      )}
      iconName={createBinding(speaker, "volumeIcon")}
    />
  );
}
