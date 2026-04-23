import Hyprland from "gi://AstalHyprland"
import NightLight from "../../../Services/NightLight"
import Caffeine from "../../../Services/Caffeine"
import { isHyprland } from "../../../utils/util"
import { exec } from "ags/process"

export const ReloadButton = () => {
  return (
    <button
      cssClasses={["reload-button"]}
      iconName={"view-refresh"}
      tooltipText={"Reload AGS"}
      onClicked={() => {
        NightLight.get_default().deactivate()
        Caffeine.get_default().deactivate()

        if (isHyprland()) {
          Hyprland.get_default().dispatch(
            "exec",
            "ags quit; ags run --log-file /tmp/ags.log",
          )
        } else {
          exec([
            "niri",
            "msg",
            "action",
            "spawn-sh",
            "--",
            "ags quit; ags run --log-file /tmp/ags.log",
          ])
        }
      }}
    />
  )
}
