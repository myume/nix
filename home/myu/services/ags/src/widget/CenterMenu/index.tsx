import { App, Astal } from "astal/gtk4";

export function CenterMenu() {
  return (
    <window
      name={"center-menu"}
      namespace={"centery-menu"}
      cssClasses={["centery-menu"]}
      layer={Astal.Layer.TOP}
      exclusivity={Astal.Exclusivity.NORMAL}
      anchor={Astal.WindowAnchor.TOP}
      application={App}
      heightRequest={200}
      child={
        <box>
          <label>test</label>
        </box>
      }
    />
  );
}
