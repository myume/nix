import AstalBattery from "gi://AstalBattery";
import { bind, derive } from "astal";
import { secondsToTimeStamp } from "../../../utils/util";

export const BatteryInfo = () => {
  const battery = AstalBattery.get_default();
  const percentage = bind(battery, "percentage").as((percentage) =>
    Math.floor(percentage * 100),
  );

  const timeToEmpty = bind(battery, "timeToEmpty").as(secondsToTimeStamp);
  const timeToFull = bind(battery, "timeToFull").as(secondsToTimeStamp);

  const charging = bind(battery, "charging");

  return (
    <box
      hexpand
      child={
        <box cssClasses={["battery-info"]}>
          <image
            cssClasses={["icon"]}
            iconName={bind(battery, "batteryIconName")}
          />
          <label
            cssClasses={["percentage"]}
            label={percentage.as((percentage) => `${percentage}%`)}
          />
          <box cssClasses={["separator"]} />
          <label
            cssClasses={["description"]}
            label={derive(
              [charging, timeToFull, timeToEmpty],
              (charging, timeToFull, timeToEmpty) =>
                charging
                  ? `${timeToFull} until fully charged`
                  : `${timeToEmpty} remaining`,
            )()}
          />
        </box>
      }
    />
  );
};
