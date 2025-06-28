import { createBinding } from "ags";
import CaffeineService from "../../../Services/Caffeine";

export default function Caffeine() {
  const caffeine = CaffeineService.get_default();
  return (
    <image
      visible={createBinding(caffeine, "enabled")}
      iconName={createBinding(caffeine, "icon")}
    />
  );
}
