import { GObject, property, register, subprocess } from "astal";
import AstalIO from "gi://AstalIO?version=0.1";

const disabledIcon = "night-light-disabled-symbolic";
const enabledIcon = "night-light-symbolic";

@register({ GTypeName: "NightLight" })
export default class NightLight extends GObject.Object {
  static instance: NightLight;
  static get_default() {
    if (!this.instance) this.instance = new NightLight();

    return this.instance;
  }

  private process: AstalIO.Process | null = null;
  #enabled = false;
  #icon = disabledIcon;
  #temperature = 4500;

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

  @property()
  get temperature() {
    return this.#temperature;
  }

  set temperature(temperature) {
    this.#temperature = temperature;
    this.notify("temperature");
  }

  activate = () => {
    if (this.process) this.deactivate();

    // this hangs for some reason, so i need to kill it
    // nothing ever works
    this.process = subprocess(["gammastep", "-O", this.temperature.toString()]);

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
