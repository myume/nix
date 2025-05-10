import AstalBattery from "gi://AstalBattery";
import { bind } from "astal";

export default function Battery() {
  const battery = AstalBattery.get_default();
  return (
    <label
      label={bind(battery, "percentage").as((p) => `${Math.floor(p * 100)}%`)}
    />
  );
}
