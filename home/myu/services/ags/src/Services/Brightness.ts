// I was too lasy to do it myself, shoutout Aylur
// https://github.com/Aylur/astal/blob/07583deff8a486fad472718572c3248f0fbea1f3/examples/gtk3/js/osd/osd/brightness.ts

import GObject, { register, getter, setter } from "ags/gobject";
import { monitorFile, readFileAsync } from "ags/file";
import { exec, execAsync } from "ags/process";

const get = (args: string) => Number(exec(`brightnessctl ${args}`));
const screen = exec(`bash -c "ls -w1 /sys/class/backlight | head -1"`);

@register({ GTypeName: "BrightnessService" })
export default class BrightnessService extends GObject.Object {
  static instance: BrightnessService;
  static get_default() {
    if (!this.instance) this.instance = new BrightnessService();

    return this.instance;
  }

  #screenMax = get("max");
  #screen = get("get") / (get("max") || 1);
  #icon_name = "brightness-symbolic";

  @getter(String)
  get icon_name() {
    return this.#icon_name;
  }

  @setter(String)
  set icon_name(value) {
    if (this.#icon_name !== value) {
      this.#icon_name = value;
      this.notify("icon_name");
    }
  }

  @getter(Number)
  get screen() {
    return this.#screen;
  }

  @setter(Number)
  set screen(percent) {
    if (percent < 0) percent = 0;

    if (percent > 1) percent = 1;

    execAsync(`brightnessctl set ${Math.floor(percent * 100)}% -q`).then(() => {
      this.#screen = percent;
      this.notify("screen");
    });
  }

  constructor() {
    super();

    // much better than polling for responsiveness lol
    monitorFile(`/sys/class/backlight/${screen}/brightness`, async (f) => {
      const v = await readFileAsync(f);
      this.#screen = Number(v) / this.#screenMax;
      if (this.#screen >= 0.8) {
        this.icon_name = "brightness-high-symbolic";
      } else if (this.#screen >= 0.5) {
        this.icon_name = "brightness-medium-symbolic";
      } else {
        this.icon_name = "brightness-low-symbolic";
      }
      this.notify("screen");
      this.notify("icon_name");
    });
  }
}
