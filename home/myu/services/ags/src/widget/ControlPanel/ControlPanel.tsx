import { Gtk } from "astal/gtk4";
import { BluetoothPanel } from "./Panels/Bluetooth";
import { NetworkPanel } from "./Panels/Network";
import { PowerProfilePanel } from "./Panels/PowerProfile";
import { DoNoDisturb } from "./Panels/DoNotDisturb";

const Panels = [
  [NetworkPanel, BluetoothPanel],
  [PowerProfilePanel, DoNoDisturb],
];

export const ControlPanel = () => {
  const panelSpacing = 8;
  return (
    <box cssClasses={["control-panel"]} halign={Gtk.Align.CENTER} hexpand>
      <box cssClasses={["sliders"]}></box>
      <box
        cssClasses={["panels"]}
        orientation={Gtk.Orientation.VERTICAL}
        spacing={panelSpacing}
      >
        {Panels.map((row) => (
          <box cssClasses={["row"]} spacing={panelSpacing} homogeneous>
            {row.map((panel) => (
              <box cssClasses={["item"]} child={panel()} homogeneous />
            ))}
          </box>
        ))}
      </box>
    </box>
  );
};
