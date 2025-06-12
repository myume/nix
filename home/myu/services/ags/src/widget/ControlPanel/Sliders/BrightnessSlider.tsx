import BrightnessService from "../../Services/Brightness";
import { bind } from "astal";
import { Slider } from "./Slider";

export const BrightnessSlider = () => {
  const brightness = BrightnessService.get_default();

  return (
    <Slider
      min={0}
      max={1}
      value={bind(brightness, "screen")}
      icon={bind(brightness, "icon_name")}
      onChange={(self) => {
        brightness.screen = self.value;
      }}
      // label={bind(brightness, "screen").as((percentage) =>
      //   Math.floor(percentage * 100).toString(),
      // )}
    />
  );
};
