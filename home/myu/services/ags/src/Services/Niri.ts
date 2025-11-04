import { getter, register, setter } from "ags/gobject"
import { createSubprocess, exec } from "ags/process"
import GObject from "gi://GObject?version=2.0"

type Workspace = {
  id: number
  idx: number
  name: string | null
  output: string
  is_urgent: boolean
  is_active: boolean
  is_focused: boolean
  active_window_id: number
}

@register({ GTypeName: "Niri" })
export default class Niri extends GObject.Object {
  static instance: Niri
  static get_default() {
    if (!this.instance) this.instance = new Niri()

    return this.instance
  }

  #workspaces: Workspace[] = []
  // #windows = []

  @getter(Object as any)
  get workspaces() {
    return this.#workspaces
  }

  @setter(Object as any)
  set workspaces(workspaces) {
    this.#workspaces = workspaces
    this.notify("workspaces")
  }

  constructor() {
    super()
    this.#workspaces = JSON.parse(exec(["niri", "msg", "-j", "workspaces"]))
    this.notify("workspaces")

    const eventStream = createSubprocess(
      "",
      ["niri", "msg", "-j", "event-stream"],
      (out) => out,
    )

    eventStream.subscribe(() => {
      const recentEvent = JSON.parse(eventStream.get())
      if (recentEvent["WorkspacesChanged"]) {
        this.#workspaces = recentEvent["WorkspacesChanged"]["workspaces"]
        this.notify("workspaces")
      } else if (
        recentEvent["WorkspaceActivated"] ||
        recentEvent["WorkspaceActiveWindowChanged"] ||
        recentEvent["WorkspaceUrgencyChanged"]
      ) {
        this.#workspaces = JSON.parse(exec(["niri", "msg", "-j", "workspaces"]))
        this.notify("workspaces")
      }
    })
  }
}
