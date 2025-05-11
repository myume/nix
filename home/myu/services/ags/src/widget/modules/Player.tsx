import { bind } from "astal";
import { Gtk } from "astal/gtk4";
import Mpris from "gi://AstalMpris";

export default function Media() {
  const mpris = Mpris.get_default();

  return (
    <box
      cssClasses={["Media"]}
      child={bind(mpris, "players").as((ps) =>
        ps.length > 0 ? (
          <box>
            <box
              cssClasses={["Cover"]}
              valign={Gtk.Align.CENTER}
              setup={(self) => {
                self.set_baseline_position;
              }}
            >
              <image
                visible={false}
                pixelSize={64}
                file={bind(ps[0], "coverArt")}
              />
            </box>
            <label
              label={bind(ps[0], "metadata").as(
                () => `${ps[0].title} - ${ps[0].artist}`,
              )}
            />
          </box>
        ) : (
          <box></box>
        ),
      )}
    ></box>
  );
}
