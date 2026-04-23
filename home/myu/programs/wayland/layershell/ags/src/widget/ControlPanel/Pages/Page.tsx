import { Gtk } from "ags/gtk4";
import { toTitleCase } from "../../../utils/util";
import { Accessor, With } from "ags";
import { Object } from "ags/gobject";

type PageProps = {
  name: string;
  child: Object | Accessor<Object>;
  returnHome: () => void;
  endWidget?: Object | Accessor<Object>;
};

export const Page = ({ name, child, returnHome, endWidget }: PageProps) => {
  return (
    <box
      $type="named"
      cssClasses={["page", name.toLowerCase().replaceAll(" ", "-")]}
      name={name}
      orientation={Gtk.Orientation.VERTICAL}
      spacing={12}
    >
      <box cssClasses={["separator"]} />
      <centerbox cssClasses={["header"]}>
        <button $type="start" label={" Back"} onClicked={returnHome} />
        <label
          $type="center"
          halign={Gtk.Align.END}
          label={toTitleCase(name)}
        />
        <box $type="end">
          {endWidget instanceof Accessor ? (
            <With value={endWidget}>{(widget) => widget}</With>
          ) : (
            (endWidget ?? <box visible={false} />)
          )}
        </box>
      </centerbox>
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
