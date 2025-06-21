import { bind } from "astal";
import NightLightService from "../../../Services/NightLight";

export default function Caffeine() {
  const nightLight = NightLightService.get_default();
  return (
    <image
      visible={bind(nightLight, "enabled")}
      iconName={bind(nightLight, "icon")}
    />
  );
}
