import { Gtk } from "astal/gtk4";
import { toTitleCase } from "../../../utils/util";
import { Binding } from "astal";

type PageProps = {
  name: string;
  child: Gtk.Widget | Binding<Gtk.Widget>;
  returnHome: () => void;
};

export const Page = ({ name, child: content, returnHome }: PageProps) => {
  return (
    <box
      cssClasses={["page", name]}
      name={name}
      orientation={Gtk.Orientation.VERTICAL}
      spacing={12}
    >
      <box cssClasses={["separator"]} />
      <centerbox
        cssClasses={["header"]}
        startWidget={<button label={" Back"} onClicked={returnHome} />}
        centerWidget={
          <label halign={Gtk.Align.END} label={toTitleCase(name)} />
        }
      />
      {content}
    </box>
  );
};
