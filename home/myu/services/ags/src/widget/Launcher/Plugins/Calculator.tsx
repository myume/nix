import { Gtk, Astal, Gdk } from "astal/gtk4";
import { LauncherPlugin } from "./Plugin";
import { derive, execAsync, Variable } from "astal";

const clipboard = Gdk.Display.get_default()?.get_clipboard();

export class Calculator extends LauncherPlugin {
  // plz no inject i beg
  result = this.input((searchString) => execAsync(["rink", searchString]));
  label = Variable("");
  showCopied = Variable(false);

  static get_default(input: Variable<string>) {
    if (!Calculator.instance) Calculator.instance = new Calculator(input);
    return Calculator.instance;
  }

  constructor(input: Variable<string>) {
    super(input);
    this.result.subscribe(async (val) => {
      this.label.set(await val);
    });
    this.label.subscribe(() => this.showCopied.set(false));
  }

  activate(): void {
    const value = this.label.get().split("\n")[1];
    clipboard?.set_content(Gdk.ContentProvider.new_for_value(value));

    this.showCopied.set(true);
  }

  getWidget(): Gtk.Widget {
    return (
      <box cssClasses={["calculator"]} orientation={Gtk.Orientation.VERTICAL}>
        <label
          // selectable // breaks focus
          halign={Gtk.Align.START}
          label={derive([this.label, this.input], (label, input) =>
            input === "" ? "Start typing to get started..." : label,
          )()}
        />
        <box cssClasses={["copy"]} visible={this.showCopied()} spacing={4}>
          <image iconName={"edit-copy-symbolic"} pixelSize={12} />
          <label label={"Copied to clipboard!"} />
        </box>
      </box>
    );
  }

  handleKeyPress(
    _self: Astal.Window,
    _keyval: number,
    _keycode: number,
    _state: Gdk.ModifierType,
  ): void {
    return;
  }

  cleanup(): void {}
}
