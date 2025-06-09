import { App, Astal, Gdk } from "astal/gtk4";

export function CenterMenu(gdkmonitor: Gdk.Monitor) {
  return (
    <window
      namespace={"floating-notifications"}
      cssClasses={["bar"]}
      layer={Astal.Layer.OVERLAY}
      exclusivity={Astal.Exclusivity.NORMAL}
      gdkmonitor={gdkmonitor}
      anchor={Astal.WindowAnchor.TOP}
      application={App}
      child={<label>test</label>}
    />
  );
}
