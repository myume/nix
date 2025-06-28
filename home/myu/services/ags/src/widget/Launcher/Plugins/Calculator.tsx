import { Gtk, Astal, Gdk } from "ags/gtk4";
import { LauncherPlugin } from "./Plugin";
import { Accessor, createComputed, createState, Setter } from "ags";
import { execAsync } from "ags/process";

const clipboard = Gdk.Display.get_default()?.get_clipboard();

export class Calculator extends LauncherPlugin {
  // plz no inject i beg
  result = this.input((searchString) => execAsync(["rink", searchString]));
  label: Accessor<string>;
  setLabel: Setter<string>;

  showCopied: Accessor<boolean>;
  setShowCopied: Setter<boolean>;

  iconName = "accessories-calculator-symbolic";
  placeholderText = "Calculate";

  static get_default(input: Accessor<string>) {
    if (!Calculator.instance) Calculator.instance = new Calculator(input);
    return Calculator.instance;
  }

  constructor(input: Accessor<string>) {
    super(input);
    [this.label, this.setLabel] = createState("");
    [this.showCopied, this.setShowCopied] = createState(false);

    this.result.subscribe(async () => {
      this.setLabel(await this.result.get());
    });
    this.label.subscribe(() => this.setShowCopied(false));
  }

  activate(): void {
    const value = this.label.get().split("\n")[1];
    clipboard?.set_content(Gdk.ContentProvider.new_for_value(value));

    this.setShowCopied(true);
  }

  getWidget(): Gtk.Widget {
    return (
      <box cssClasses={["calculator"]} orientation={Gtk.Orientation.VERTICAL}>
        <label
          // selectable // breaks focus
          halign={Gtk.Align.START}
          label={createComputed([this.label, this.input], (label, input) =>
            input === "" ? "Start typing to get started..." : label,
          )}
        />
        <box cssClasses={["copy"]} visible={this.showCopied} spacing={4}>
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
