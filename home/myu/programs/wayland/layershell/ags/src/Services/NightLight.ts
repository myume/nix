import GObject, { getter, register, setter } from "ags/gobject"
import { Process, subprocess } from "ags/process"

const disabledIcon = "night-light-disabled-symbolic"
const enabledIcon = "night-light-symbolic"

@register({ GTypeName: "NightLight" })
export default class NightLight extends GObject.Object {
  static instance: NightLight
  static get_default() {
    if (!this.instance) this.instance = new NightLight()

    return this.instance
  }

  private process: Process | null = null
  #enabled = false
  #icon = disabledIcon
  #temperature = 4500

  @getter(Boolean)
  get enabled() {
    return this.#enabled
  }

  @setter(Boolean)
  set enabled(enabled) {
    this.#enabled = enabled
    this.notify("enabled")
  }

  @getter(String)
  get icon() {
    return this.#icon
  }

  @setter(String)
  set icon(icon) {
    this.#icon = icon
    this.notify("icon")
  }

  @getter(Number)
  get temperature() {
    return this.#temperature
  }

  @setter(Number)
  set temperature(temperature) {
    this.#temperature = temperature
    this.notify("temperature")
  }

  activate = () => {
    if (this.process) this.deactivate()

    // this hangs for some reason, so i need to kill it
    // nothing ever works
    this.process = subprocess(["gammastep", "-O", this.temperature.toString()])

    this.#enabled = true
    this.notify("enabled")
    this.#icon = enabledIcon
    this.notify("icon")
  }

  deactivate = () => {
    if (!this.process) return

    this.process.kill()
    this.process = null

    this.#enabled = false
    this.notify("enabled")
    this.#icon = disabledIcon
    this.notify("icon")
  }
}
