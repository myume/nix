import { Gtk } from "astal/gtk4";
import { notificationCenterName } from "../NotificationCenter";

type PageProps = {
  name: string;
  child: Gtk.Widget;
  setPageName: (name: string) => void;
};

export const Page = ({ name, child: content, setPageName }: PageProps) => {
  return (
    <box
      cssClasses={["page"]}
      name={name}
      orientation={Gtk.Orientation.VERTICAL}
      spacing={12}
    >
      <box cssClasses={["separator"]} />
      <button
        label={""}
        onClicked={() => setPageName(notificationCenterName)}
      />
      {content}
    </box>
  );
};
