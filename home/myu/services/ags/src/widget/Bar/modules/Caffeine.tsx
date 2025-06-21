import { bind } from "astal";
import CaffeineService from "../../../Services/Caffeine";

export default function Caffeine() {
  const caffeine = CaffeineService.get_default();
  return (
    <image
      visible={bind(caffeine, "enabled")}
      iconName={bind(caffeine, "icon")}
    />
  );
}
