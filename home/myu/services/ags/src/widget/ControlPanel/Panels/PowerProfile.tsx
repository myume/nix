import PowerProfiles from "gi://AstalPowerProfiles";
import { Panel } from "./Panel";
import { bind, Variable } from "astal";
import { toTitleCase } from "../../../utils/util";

const profiles = ["power-saver", "balanced", "performance"];

export const PowerProfilePanel = () => {
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
    />
  );
};
