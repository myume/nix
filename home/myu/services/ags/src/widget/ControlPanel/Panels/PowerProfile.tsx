import PowerProfiles from "gi://AstalPowerProfiles";
import { Panel } from "./Panel";
import { bind, Variable } from "astal";
import { toTitleCase } from "../../../utils/util";
import { powerProfilePageName } from "../Pages/PowerProfile";

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
      description={bind(powerProfiles, "activeProfile").as(toTitleCase)}
      icon={bind(powerProfiles, "iconName")}
      enabled={Variable(true)()} // always enabled
      onDisable={cycleNextProfile}
      onEnable={cycleNextProfile} // should never run since always enabled
      onExpand={() => setPageName(powerProfilePageName)}
    />
  );
};
