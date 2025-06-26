import Hyprland from "gi://AstalHyprland";
import NightLight from "../../../Services/NightLight";
import Caffeine from "../../../Services/Caffeine";

export const ReloadButton = () => {
  return (
    <button
      cssClasses={["reload-button"]}
      iconName={"view-refresh"}
      tooltipText={"Reload AGS"}
      onClicked={() => {
        NightLight.get_default().deactivate();
        Caffeine.get_default().deactivate();

        Hyprland.get_default().dispatch(
          "exec",
          "pkill gjs && ags run --gtk4 --log-file /tmp/ags.log",
        );
      }}
    />
  );
};
