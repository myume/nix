import { Page } from "./Page";
import { profiles } from "../Panels/PowerProfile";
import PowerProfiles from "gi://AstalPowerProfiles";
import { Gtk } from "ags/gtk4";
import { createBinding } from "ags";

export const powerProfilePageName = "Power Profiles";

export const PowerProfilePage = ({
  returnHome,
}: {
  returnHome: () => void;
}) => {
  const powerProfiles = PowerProfiles.get_default();

  return (
    <Page
      name={powerProfilePageName}
      child={
        <box
          cssClasses={["profiles"]}
          hexpand
          vexpand
          valign={Gtk.Align.CENTER}
          halign={Gtk.Align.CENTER}
          spacing={8}
          homogeneous
        >
          {profiles.map((profile) => (
            <button
              cssClasses={createBinding(powerProfiles, "activeProfile").as(
                (activeProfile) => [
                  activeProfile === profile ? "selected" : "",
                ],
              )}
              onClicked={() => powerProfiles.set_active_profile(profile)}
            >
              <box orientation={Gtk.Orientation.VERTICAL} spacing={8}>
                <image
                  iconName={`power-profile-${profile}-symbolic`}
                  pixelSize={64}
                />
                <label>{profile}</label>
              </box>
            </button>
          ))}
        </box>
      }
      returnHome={returnHome}
    />
  );
};
