import { createBinding } from "ags";
import BrightnessService from "../../../Services/Brightness";

export default function Brightness() {
  const brightness = BrightnessService.get_default();
  const percentage = createBinding(brightness, "screen").as((percentage) =>
    Math.floor(percentage * 100),
  );

  return (
    <button>
      <image
        iconName={createBinding(brightness, "icon_name")}
        tooltipText={percentage.as(
          (percentage) => `Brightness at ${percentage}%`,
        )}
      />
    </button>
  );
}
