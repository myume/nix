import { Accessor } from "ags";
import { Object } from "ags/gobject";
import { Astal, Gdk } from "ags/gtk4";

export abstract class LauncherPlugin {
  static instance: LauncherPlugin;

  input: Accessor<string>;
  iconName = "system-search";
  placeholderText = "";

  constructor(input: Accessor<string>) {
    this.input = input;
  }

  abstract activate(): void;

  abstract getWidget(): Object;

  abstract handleKeyPress(
    self: Astal.Window,
    keyval: number,
    keycode: number,
    state: Gdk.ModifierType,
  ): void;

  abstract cleanup(): void;
}
