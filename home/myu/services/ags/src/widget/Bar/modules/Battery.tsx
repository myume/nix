import AstalBattery from "gi://AstalBattery";
import { secondsToTimeStamp } from "../../../utils/util";
import { createBinding, createComputed } from "ags";

export default function Battery() {
  const battery = AstalBattery.get_default();
  const percentage = createBinding(battery, "percentage").as((percentage) =>
    Math.floor(percentage * 100),
  );

  const timeToEmpty = createBinding(battery, "timeToEmpty").as(
    secondsToTimeStamp,
  );
  const timeToFull = createBinding(battery, "timeToFull").as(
    secondsToTimeStamp,
  );

  const charging = createBinding(battery, "charging");

  const description = createComputed(
    [percentage, timeToEmpty, timeToFull, charging],
    (percentage, timeToEmpty, timeToFull, charging) =>
      `Battery on ${percentage}%\n` +
      (!charging
        ? `${timeToEmpty} remaining`
        : percentage == 100
          ? "Fully Charged"
          : `${timeToFull} until charged`),
  );

  return (
    <button tooltipText={description}>
      <box>
        <image
          iconName={createBinding(battery, "batteryIconName")} // iconName for BW version
        />
        <label
          cssClasses={["battery-percentage"]}
          visible={true}
          label={percentage.as((percentage) => `${percentage}%`)}
        />
      </box>
    </button>
  );
}
