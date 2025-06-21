import { bind, derive } from "astal";
import { Panel } from "./Panel";
import NightLightService from "../../../Services/NightLight";

export const NightLight = () => {
  const nightLight = NightLightService.get_default();
  const enabled = bind(nightLight, "enabled");

  return (
    <Panel
      title={"Night Light"}
      description={derive(
        [enabled, bind(nightLight, "temperature")],
        (enabled, temp) => (enabled ? `${temp}K` : "Disabled"),
      )()}
      enabled={enabled}
      icon={bind(nightLight, "icon")}
      onEnable={() => nightLight.activate()}
      onDisable={() => nightLight.deactivate()}
    />
  );
};
