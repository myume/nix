import Hyprland from "gi://AstalHyprland";
import { bind } from "astal";

export default function Workspaces() {
  const hypr = Hyprland.get_default();

  return (
    <box cssClasses={["workspaces"]}>
      {Array.from({ length: 9 }, (_, i) => i + 1).map((ws) => {
        const fw = bind(hypr, "focusedWorkspace");
        return (
          <button
            cssClasses={fw.as((fw) => [ws === fw.id ? "focused" : ""])}
            onClicked={() => hypr.dispatch("workspace", ws.toString())}
          />
        );
      })}
    </box>
  );
}
