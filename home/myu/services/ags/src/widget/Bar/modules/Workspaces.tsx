import { createBinding, createComputed, For } from "ags"
import Hyprland from "gi://AstalHyprland"
import { isHyprland } from "../../../utils/util"
import Niri from "../../../Services/Niri"
import { exec } from "ags/process"

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

function NiriWorkspaces({ outputName }: { outputName: string }) {
  const niri = Niri.get_default()
  const workspaces = createBinding(niri, "workspaces").as((workspaces) =>
    workspaces
      .filter(({ output }) => output === outputName)
      .toSorted((a, b) => a.idx - b.idx),
  )
  return (
    <box cssClasses={["workspaces"]}>
      <For each={workspaces}>
        {(workspace) => (
          <button
            cssClasses={[
              workspace.is_focused
                ? "focused"
                : workspace.is_active
                  ? "populated"
                  : "empty",
            ]}
            onClicked={() =>
              exec([
                "niri",
                "msg",
                "action",
                "focus-workspace",
                workspace.idx.toString(),
              ])
            }
          />
        )}
      </For>
    </box>
  )
}

export default function Workspaces({ outputName }: { outputName: string }) {
  return isHyprland() ? (
    <HyprWorkspaces />
  ) : (
    <NiriWorkspaces outputName={outputName} />
  )
}
