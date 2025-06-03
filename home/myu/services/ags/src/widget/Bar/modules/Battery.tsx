import AstalBattery from "gi://AstalBattery";
import { bind, derive } from "astal";

const secondsToTimeStamp = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);

  return `${h}h ${m}m`;
};

export default function Battery() {
  const battery = AstalBattery.get_default();
  const percentage = bind(battery, "percentage").as((percentage) =>
    Math.floor(percentage * 100),
  );

  const timeToEmpty = bind(battery, "timeToEmpty").as(secondsToTimeStamp);
  const timeToFull = bind(battery, "timeToFull").as(secondsToTimeStamp);

  const charging = bind(battery, "charging");

  return (
    <button
      tooltipText={derive([percentage, timeToEmpty, timeToFull, charging])().as(
        ([percentage, timeToEmpty, timeToFull, charging]) =>
          `Battery on ${percentage}%\n` +
          (!charging
            ? `${timeToEmpty} remaining`
            : percentage == 100
              ? "Fully Charged"
              : `${timeToFull} until charged`),
      )}
    >
      <box>
        <image
          cssClasses={derive([percentage, charging])().as(
            ([percentage, charging]) => {
              const classes = [
                percentage >= 80 ? "high" : percentage >= 50 ? "med" : "low",
              ];

              if (charging) classes.push("charging");

              return classes;
            },
          )}
          iconName={bind(battery, "iconName")}
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
