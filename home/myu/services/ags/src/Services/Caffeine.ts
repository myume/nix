import { GObject, property, register, subprocess } from "astal";
import AstalIO from "gi://AstalIO?version=0.1";

@register({ GTypeName: "Caffeine" })
export default class Caffeine extends GObject.Object {
  static instance: Caffeine;
  static get_default() {
    if (!this.instance) this.instance = new Caffeine();

    return this.instance;
  }

  private process: AstalIO.Process | null = null;

  #enabled = false;
  #icon = "caffeine-cup-empty";

  @property()
  get enabled() {
    return this.#enabled;
  }

  set enabled(enabled) {
    this.#enabled = enabled;
    this.notify("enabled");
  }

  @property()
  get icon() {
    return this.#icon;
  }

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
    this.#icon = "caffeine-cup-full";
    this.notify("icon");
  };

  deactivate = () => {
    if (!this.process) return;

    this.process.kill();

    this.process = null;
    this.#enabled = false;
    this.notify("enabled");
    this.#icon = "caffeine-cup-full";
    this.notify("icon");
  };
}
