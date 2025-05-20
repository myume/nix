import AstalWp from "gi://AstalWp";
import { bind } from "astal";

export default function AudioOutput() {
  const { defaultSpeaker: speaker } = AstalWp.get_default()!;

  return (
    <menubutton
      tooltipText={bind(speaker, "volume").as(
        (volume) => `Volume at ${Math.round(volume * 100)}%`,
      )}
    >
      <image iconName={bind(speaker, "volumeIcon")} />
      <popover
        cssClasses={["volumeSlider"]}
        // hasArrow={false}
        child={
          <box
            child={
              <slider
                widthRequest={260}
                onChangeValue={({ value }) => speaker.set_volume(value)}
                value={bind(speaker, "volume")}
              />
            }
          />
        }
      />
    </menubutton>
  );
}
