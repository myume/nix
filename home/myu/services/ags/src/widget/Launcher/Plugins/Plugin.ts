import { Variable } from "astal";
import { Astal, Gdk, Gtk } from "astal/gtk4";

export abstract class LauncherPlugin {
  searchString: Variable<string>;

  constructor(input: Variable<string>) {
    this.searchString = input;
  }

  abstract activate(): void;

  abstract getWidget(): Gtk.Widget;

  abstract handleKeyPress(
    self: Astal.Window,
    keyval: number,
    keycode: number,
    state: Gdk.ModifierType,
  ): void;

  abstract cleanup(): void;
}
