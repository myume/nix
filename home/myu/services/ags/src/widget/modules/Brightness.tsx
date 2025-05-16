import { bind } from "astal";
import BrightnessService from "../services/Brightness";

export default function Brightness() {
  const brightness = BrightnessService.get_default();
  const percentage = bind(brightness, "screen").as((percentage) =>
    Math.floor(percentage * 100),
  );

  return (
    <button>
      <image
        iconName={bind(brightness, "icon_name")}
        tooltipText={percentage.as(
          (percentage) => `Brightness at ${percentage}%`,
        )}
      />
    </button>
  );
}
