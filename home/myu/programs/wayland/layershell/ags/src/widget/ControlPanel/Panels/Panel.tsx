import { Accessor } from "ags";
import { Gtk } from "ags/gtk4";

type PanelProps = {
  title: string | Accessor<string>;
  icon: string | Accessor<string>;
  description: string | Accessor<string>;
  enabled: Accessor<boolean>;
  onEnable: (b: Gtk.Button) => void;
  onDisable: (b: Gtk.Button) => void;
  onExpand?: () => void;
};

export const Panel = ({
  title,
  description,
  icon,
  enabled,
  onEnable,
  onDisable,
  onExpand,
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
      hexpand
    >
      <box spacing={10}>
        <image iconName={icon} pixelSize={16} />
        <box orientation={Gtk.Orientation.VERTICAL}>
          <label cssClasses={["title"]} label={title} xalign={0} />
          <label cssClasses={["description"]} label={description} xalign={0} />
        </box>
      </box>
    </button>
    <button
      cssClasses={["show-page"]}
      visible={onExpand !== undefined}
      label={""}
      onClicked={() => {
        if (onExpand) onExpand();
      }}
    />
  </box>
);
