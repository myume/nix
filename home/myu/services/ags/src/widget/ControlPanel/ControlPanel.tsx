import { Gtk } from "astal/gtk4";
import { Sliders } from "./Sliders";
import { Panels } from "./Panels";
import { BatteryInfo } from "./Footer/BatteryInfo";
import { PowerButton } from "./Footer/PowerButton";
import { ScreenshotButton } from "./Footer/ScreenshotButton";

export const ControlPanel = ({
  closeControlPanel,
  setPageName,
}: {
  closeControlPanel: () => void;
  setPageName: (name: string) => void;
}) => {
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
              <box
                cssClasses={["item"]}
                child={panel(setPageName)}
                homogeneous
              />
            ))}
          </box>
        ))}
      </box>
      <box cssClasses={["footer"]} spacing={4}>
        <BatteryInfo />
        <ScreenshotButton />
        <PowerButton closeControlPanel={closeControlPanel} />
      </box>
    </box>
  );
};
