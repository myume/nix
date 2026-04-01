import { createBinding, createComputed, For } from "ags"
import Hyprland from "gi://AstalHyprland"
import { isHyprland } from "../../../utils/util"
import Niri from "../../../Services/Niri"
import { exec } from "ags/process"
import { Gdk } from "ags/gtk4"

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

function NiriWorkspaces({ monitor }: { monitor: Gdk.Monitor }) {
  const niri = Niri.get_default()
  const monitorName = createBinding(monitor, "connector")
  const workspaces = createBinding(niri, "workspaces")
  const monitorWorkspaces = createComputed(() =>
    workspaces()
      .filter(({ output }) => output === monitorName())
      .toSorted((a, b) => a.idx - b.idx),
  )

  return (
    <box cssClasses={["workspaces"]}>
      <For each={monitorWorkspaces}>
        {(ws) => (
          <button
            cssClasses={[
              ws.is_focused
                ? "focused"
                : ws.active_window_id !== null
                  ? "populated"
                  : "empty",
            ]}
            onClicked={() =>
              exec([
                "niri",
                "msg",
                "action",
                "focus-workspace",
                ws.idx.toString(),
              ])
            }
          />
        )}
      </For>
    </box>
  )
}

export default function Workspaces({ monitor }: { monitor: Gdk.Monitor }) {
  // return isHyprland() ? (
  //   <HyprWorkspaces />
  // ) : (
  return <NiriWorkspaces monitor={monitor} />
  // )
}
