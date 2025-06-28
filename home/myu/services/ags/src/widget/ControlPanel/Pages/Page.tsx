import { Gtk } from "ags/gtk4";
import { toTitleCase } from "../../../utils/util";
import { Accessor, With } from "ags";

type PageProps = {
  name: string;
  child: Gtk.Widget | Accessor<Gtk.Widget>;
  returnHome: () => void;
  endWidget?: Gtk.Widget | Accessor<Gtk.Widget>;
};

export const Page = ({ name, child, returnHome, endWidget }: PageProps) => {
  return (
    <box
      cssClasses={["page", name.toLowerCase().replaceAll(" ", "-")]}
      name={name}
      orientation={Gtk.Orientation.VERTICAL}
      spacing={12}
    >
      <box cssClasses={["separator"]} />
      <centerbox
        cssClasses={["header"]}
        startWidget={
          (<button label={" Back"} onClicked={returnHome} />) as Gtk.Widget
        }
        centerWidget={
          (
            <label halign={Gtk.Align.END} label={toTitleCase(name)} />
          ) as Gtk.Widget
        }
        endWidget={endWidget ?? <box visible={false} />}
      />
      <box>
        {child instanceof Accessor ? (
          <With value={child}>{(child) => child}</With>
        ) : (
          child
        )}
      </box>
    </box>
  );
};
