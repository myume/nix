import { createBinding, createComputed } from "ags"
import Hyprland from "gi://AstalHyprland"
import { isHyprland } from "../../../utils/util"

function HyprWorkspaces() {
  const hypr = Hyprland.get_default()
  const populatedWs = createBinding(hypr, "clients").as((clients) =>
    clients.map((client) => client.workspace.id),
  )

  hypr.connect("client-moved", () => hypr.notify("clients"))

  return (
    <box cssClasses={["workspaces"]}>
      {Array.from({ length: 9 }, (_, i) => i + 1).map((wsId) => {
        const fw = createBinding(hypr, "focusedWorkspace")

        const wsState = createComputed([populatedWs, fw], (populatedWs, fw) => [
          fw && fw.id && wsId === fw.id
            ? "focused"
            : populatedWs.includes(wsId)
              ? "populated"
              : "empty",
        ])

        return (
          <button
            cssClasses={wsState}
            onClicked={() => hypr.dispatch("workspace", wsId.toString())}
          />
        )
      })}
    </box>
  )
}

function NiriWorkspaces() {
  return <box></box>
}

export default function Workspaces() {
  return isHyprland() ? <HyprWorkspaces /> : <NiriWorkspaces />
}
