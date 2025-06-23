import Hyprland from "gi://AstalHyprland";
import NightLight from "../../../Services/NightLight";

export const ReloadButton = () => {
  return (
    <button
      cssClasses={["reload-button"]}
      iconName={"view-refresh"}
      tooltipText={"Reload AGS"}
      onClicked={() => {
        // night light will not work after unless we kill the process here
        NightLight.get_default().deactivate();

        Hyprland.get_default().dispatch(
          "exec",
          "pkill gjs && ags run --gtk4 --log-file /tmp/ags.log",
        );
      }}
    />
  );
};
