import { bind } from "astal";
import { Panel } from "./Panel";
import CaffeineService from "../../../Services/Caffeine";

export const Caffeine = () => {
  const caffeine = CaffeineService.get_default();
  const enabled = bind(caffeine, "enabled");

  return (
    <Panel
      title={"Caffeine"}
      description={enabled.as((enabled) => (enabled ? "Active" : "Inactive"))}
      enabled={enabled}
      icon={bind(caffeine, "icon")}
      onEnable={() => caffeine.activate()}
      onDisable={() => caffeine.deactivate()}
    />
  );
};
