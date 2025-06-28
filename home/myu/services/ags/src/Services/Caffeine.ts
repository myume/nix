import GObject, { register, getter, setter } from "ags/gobject";
import { subprocess } from "ags/process";
import AstalIO from "gi://AstalIO?version=0.1";

const disabledIcon = "caffeine-cup-empty";
const enabledIcon = "caffeine-cup-full";

@register({ GTypeName: "Caffeine" })
export default class Caffeine extends GObject.Object {
  static instance: Caffeine;
  static get_default() {
    if (!this.instance) this.instance = new Caffeine();

    return this.instance;
  }

  private process: AstalIO.Process | null = null;

  #enabled = false;
  #icon = disabledIcon;

  @getter(Boolean)
  get enabled() {
    return this.#enabled;
  }

  @setter(Boolean)
  set enabled(enabled) {
    this.#enabled = enabled;
    this.notify("enabled");
  }

  @getter(String)
  get icon() {
    return this.#icon;
  }

  @setter(String)
  set icon(icon) {
    this.#icon = icon;
    this.notify("icon");
  }

  activate = () => {
    if (this.process) this.deactivate();

    this.process = subprocess([
      "systemd-inhibit",
      "--who=Caffeine",
      "--what=idle:sleep",
      "--why=Caffeine mode is active",
      "sleep",
      "infinity",
    ]);

    this.#enabled = true;
    this.notify("enabled");
    this.#icon = enabledIcon;
    this.notify("icon");
  };

  deactivate = () => {
    if (!this.process) return;

    this.process.kill();

    this.process = null;
    this.#enabled = false;
    this.notify("enabled");
    this.#icon = disabledIcon;
    this.notify("icon");
  };
}
