import { Binding } from "astal";
import { Gtk } from "astal/gtk4";

type PanelProps = {
  title: string | Binding<string>;
  icon: string | Binding<string>;
  description: string | Binding<string>;
  enabled: Binding<boolean>;
  onEnable: (b: Gtk.Button) => void;
  onDisable: (b: Gtk.Button) => void;
  showPage?: () => void;
};

export const Panel = ({
  title,
  description,
  icon,
  enabled,
  onEnable,
  onDisable,
  showPage,
}: PanelProps) => (
  <box
    cssClasses={enabled.as((enabled) => [
      "panel",
      enabled ? "enabled" : "disabled",
    ])}
    widthRequest={150}
  >
    <button
      onClicked={(self) => {
        const handler = enabled.get() ? onDisable : onEnable;
        handler(self);
      }}
      valign={Gtk.Align.START}
      child={
        <box spacing={10}>
          <image iconName={icon} pixelSize={16} />
          <box orientation={Gtk.Orientation.VERTICAL}>
            <label cssClasses={["title"]} label={title} xalign={0} />
            <label
              cssClasses={["description"]}
              label={description}
              xalign={0}
            />
          </box>
        </box>
      }
      hexpand
    />

    <button
      visible={showPage !== undefined}
      label={""}
      onClicked={() => {
        if (showPage) showPage();
      }}
    />
  </box>
);
