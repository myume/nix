import { Panel } from "./Panel";
import NightLightService from "../../../Services/NightLight";
import { createBinding, createComputed } from "ags";

export const NightLight = () => {
  const nightLight = NightLightService.get_default();
  const enabled = createBinding(nightLight, "enabled");

  return (
    <Panel
      title={"Night Light"}
      description={createComputed(
        [enabled, createBinding(nightLight, "temperature")],
        (enabled, temp) => (enabled ? `${temp}K` : "Disabled"),
      )}
      enabled={enabled}
      icon={createBinding(nightLight, "icon")}
      onEnable={() => nightLight.activate()}
      onDisable={() => nightLight.deactivate()}
    />
  );
};
