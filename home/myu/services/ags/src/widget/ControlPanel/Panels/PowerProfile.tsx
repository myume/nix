import PowerProfiles from "gi://AstalPowerProfiles";
import { Panel } from "./Panel";
import { toTitleCase } from "../../../utils/util";
import { powerProfilePageName } from "../Pages/PowerProfile";
import { createBinding, createState } from "ags";

export const profiles = ["power-saver", "balanced", "performance"];

export const PowerProfilePanel = (setPageName: (name: string) => void) => {
  const powerProfiles = PowerProfiles.get_default();
  let profileIndex = profiles.findIndex(
    (val) => val === powerProfiles.activeProfile,
  );

  const cycleNextProfile = () => {
    profileIndex = (profileIndex + 1) % profiles.length;
    powerProfiles.set_active_profile(profiles[profileIndex]);
  };

  return (
    <Panel
      title={"Power Profile"}
      description={createBinding(powerProfiles, "activeProfile").as(
        toTitleCase,
      )}
      icon={createBinding(powerProfiles, "iconName")}
      enabled={createState(true)[0]} // always enabled
      onDisable={cycleNextProfile}
      onEnable={cycleNextProfile} // should never run since always enabled
      onExpand={() => setPageName(powerProfilePageName)}
    />
  );
};
