import { Panel } from "./Panel";
import CaffeineService from "../../../Services/Caffeine";
import { createBinding } from "ags";

export const Caffeine = () => {
  const caffeine = CaffeineService.get_default();
  const enabled = createBinding(caffeine, "enabled");

  return (
    <Panel
      title={"Caffeine"}
      description={enabled.as((enabled) => (enabled ? "Enabled" : "Disabled"))}
      enabled={enabled}
      icon={createBinding(caffeine, "icon")}
      onEnable={() => caffeine.activate()}
      onDisable={() => caffeine.deactivate()}
    />
  );
};
