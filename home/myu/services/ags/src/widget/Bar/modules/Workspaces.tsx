import Hyprland from "gi://AstalHyprland";
import { bind, derive } from "astal";

export default function Workspaces() {
  const hypr = Hyprland.get_default();
  const populatedWs = bind(hypr, "workspaces").as((workspaces) =>
    workspaces.filter((ws) => ws.clients.length > 0).map(({ id }) => id),
  );

  return (
    <box cssClasses={["workspaces"]}>
      {Array.from({ length: 9 }, (_, i) => i + 1).map((wsId) => {
        const fw = bind(hypr, "focusedWorkspace");

        const wsState = derive([populatedWs, fw], (populatedWs, fw) => [
          fw && fw.id && wsId === fw.id
            ? "focused"
            : populatedWs.includes(wsId)
              ? "populated"
              : "empty",
        ]);

        return (
          <button
            cssClasses={wsState()}
            onClicked={() => hypr.dispatch("workspace", wsId.toString())}
          />
        );
      })}
    </box>
  );
}
