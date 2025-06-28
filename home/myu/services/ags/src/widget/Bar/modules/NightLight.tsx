import { createBinding } from "ags";
import NightLightService from "../../../Services/NightLight";

export default function Caffeine() {
  const nightLight = NightLightService.get_default();
  return (
    <image
      visible={createBinding(nightLight, "enabled")}
      iconName={createBinding(nightLight, "icon")}
    />
  );
}
