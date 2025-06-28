import { createBinding } from "ags";
import BrightnessService from "../../../Services/Brightness";
import { Slider } from "./Slider";

export const BrightnessSlider = () => {
  const brightness = BrightnessService.get_default();

  return (
    <Slider
      min={0}
      max={1}
      value={createBinding(brightness, "screen")}
      icon={createBinding(brightness, "icon_name")}
      onChange={(self) => {
        brightness.screen = self.value;
      }}
      // label={createBinding(brightness, "screen").as((percentage) =>
      //   Math.floor(percentage * 100).toString(),
      // )}
    />
  );
};
