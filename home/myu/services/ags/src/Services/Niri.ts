import { register } from "ags/gobject"
import GObject from "gi://GObject?version=2.0"

@register({ GTypeName: "Niri" })
export default class Niri extends GObject.Object {
  static instance: Niri
  static get_default() {
    if (!this.instance) this.instance = new Niri()

    return this.instance
  }
}
