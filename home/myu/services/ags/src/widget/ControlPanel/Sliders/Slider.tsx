import { Binding } from "astal";
import { Astal, astalify, Gtk } from "astal/gtk4";

const Overlay = astalify<Gtk.Overlay>(Gtk.Overlay);

export const Slider = ({
  min,
  max,
  value,
  onChange,
  icon,
  label,
}: {
  min: number | Binding<number>;
  max: number | Binding<number>;
  value: number | Binding<number>;
  onChange: (s: Astal.Slider) => void;
  icon: string | Binding<string>;
  label?: string | Binding<string>;
}) => (
  <Overlay
    cssClasses={["slider"]}
    setup={(self) => {
      self.add_overlay(
        <box cssClasses={["info"]} canTarget={false} spacing={4}>
          <image
            cssClasses={["icon"]}
            pixelSize={16}
            iconName={icon}
            halign={Gtk.Align.END}
          />
          {label ? (
            <label
              cssClasses={["value"]}
              label={label}
              halign={Gtk.Align.END}
            />
          ) : (
            <box visible={false} />
          )}
        </box>,
      );
    }}
  >
    <slider
      min={min}
      widthRequest={200}
      max={max}
      value={value}
      onChangeValue={onChange}
      overflow={Gtk.Overflow.HIDDEN}
      hexpand
    />
  </Overlay>
);
