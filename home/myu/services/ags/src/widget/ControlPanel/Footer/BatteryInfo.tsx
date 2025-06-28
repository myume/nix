import AstalBattery from "gi://AstalBattery";
import { secondsToTimeStamp } from "../../../utils/util";
import { createBinding, createComputed } from "ags";

export const BatteryInfo = () => {
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

  return (
    <box hexpand>
      <box cssClasses={["battery-info"]}>
        <image
          cssClasses={["icon"]}
          iconName={createBinding(battery, "batteryIconName")}
        />
        <label
          cssClasses={["percentage"]}
          label={percentage.as((percentage) => `${percentage}%`)}
        />
        <box cssClasses={["separator"]} />
        <label
          cssClasses={["description"]}
          label={createComputed(
            [charging, timeToFull, timeToEmpty],
            (charging, timeToFull, timeToEmpty) =>
              charging
                ? `${timeToFull} until fully charged`
                : `${timeToEmpty} remaining`,
          )}
        />
      </box>
    </box>
  );
};
