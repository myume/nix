import { Gtk } from "astal/gtk4";
import { Sliders } from "./Sliders";
import { Panels } from "./Panels";
import { BatteryInfo } from "./Footer/BatteryInfo";
import { PowerMenu } from "./Footer/PowerMenu";

export const ControlPanel = () => {
  const panelSpacing = 8;
  return (
    <box
      cssClasses={["control-panel"]}
      halign={Gtk.Align.CENTER}
      orientation={Gtk.Orientation.VERTICAL}
      hexpand
      spacing={12}
    >
      <box
        cssClasses={["sliders"]}
        orientation={Gtk.Orientation.VERTICAL}
        spacing={panelSpacing / 2}
      >
        {Sliders.map((row) => (
          <box spacing={panelSpacing}>
            {row.map((slider) => (
              <box child={slider()} homogeneous />
            ))}
          </box>
        ))}
      </box>
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
      <box cssClasses={["footer"]} spacing={8}>
        <BatteryInfo />
        <PowerMenu />
      </box>
    </box>
  );
};
