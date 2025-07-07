import { Accessor } from "ags";
import { Astal, Gtk } from "ags/gtk4";

export const Slider = ({
  min,
  max,
  value,
  onChange,
  icon,
  label,
  onExpand,
}: {
  min: number | Accessor<number>;
  max: number | Accessor<number>;
  value: number | Accessor<number>;
  onChange: (s: Astal.Slider) => void;
  icon: string | Accessor<string>;
  label?: string | Accessor<string>;
  onExpand?: () => void;
}) => (
  <Gtk.Overlay
    cssClasses={["slider"]}
    $={(self) => {
      self.add_overlay(
        (
          <box cssClasses={["info"]} canTarget={false} spacing={4}>
            <image
              cssClasses={["icon"]}
              pixelSize={16}
              iconName={icon}
              halign={Gtk.Align.START}
            />
            {label ? (
              <label
                cssClasses={["value"]}
                label={label}
                halign={Gtk.Align.START}
              />
            ) : (
              <box visible={false} />
            )}
          </box>
        ) as Gtk.Widget,
      );
    }}
  >
    <box>
      <slider
        min={min}
        widthRequest={200}
        max={max}
        value={value}
        onChangeValue={onChange}
        overflow={Gtk.Overflow.HIDDEN}
        hexpand
      />
      <button
        cssClasses={["show-page"]}
        visible={onExpand !== undefined}
        label={""}
        onClicked={() => {
          if (onExpand) onExpand();
        }}
      />
    </box>
  </Gtk.Overlay>
);
