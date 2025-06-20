import AstalBattery from "gi://AstalBattery";
import { bind, derive } from "astal";
import { secondsToTimeStamp } from "../../../utils/util";

export default function Battery() {
  const battery = AstalBattery.get_default();
  const percentage = bind(battery, "percentage").as((percentage) =>
    Math.floor(percentage * 100),
  );

  const timeToEmpty = bind(battery, "timeToEmpty").as(secondsToTimeStamp);
  const timeToFull = bind(battery, "timeToFull").as(secondsToTimeStamp);

  const charging = bind(battery, "charging");

  const description = derive(
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
    <button
      tooltipText={description()}
      child={
        <box>
          <image
            iconName={bind(battery, "batteryIconName")} // iconName for BW version
          />
          <label
            cssClasses={["battery-percentage"]}
            visible={true}
            label={percentage.as((percentage) => `${percentage}%`)}
          />
        </box>
      }
    />
  );
}
