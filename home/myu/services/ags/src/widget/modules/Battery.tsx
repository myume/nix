import AstalBattery from "gi://AstalBattery";
import { bind, derive } from "astal";

export default function Battery() {
  const battery = AstalBattery.get_default();
  const percentage = bind(battery, "percentage");
  const charging = bind(battery, "state").as(
    (state) => state === AstalBattery.State.CHARGING,
  );

  return (
    <button
      tooltipText={percentage.as((p) => `Battery on ${Math.round(p * 100)}%`)}
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
          label={percentage.as((p) => `${Math.round(p * 100)}%`)}
        />
      </box>
    </button>
  );
}
