import Hyprland from "gi://AstalHyprland";

export const ReloadButton = () => {
  const hypr = Hyprland.get_default();
  return (
    <button
      cssClasses={["reload-button"]}
      iconName={"view-refresh"}
      tooltipText={"Reload AGS"}
      onClicked={() => hypr.dispatch("exec", "pkill gjs && ags run --gtk4")}
    />
  );
};
