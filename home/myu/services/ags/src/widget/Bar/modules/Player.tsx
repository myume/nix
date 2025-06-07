import { bind, Gio, Variable } from "astal";
import Mpris from "gi://AstalMpris";
import AstalApps from "gi://AstalApps";

const apps = new AstalApps.Apps();

function PlayerWidget(player: Mpris.Player) {
  return (
    <box spacing={6}>
      <image
        cssClasses={["icon"]}
        iconName={bind(player, "entry").as(
          (entry) => apps.exact_query(entry)[0].iconName,
        )}
      />
      <label label={bind(player, "title").as((title) => title ?? "unknown")} />
      <box cssClasses={["separator"]} />
      <label
        label={bind(player, "artist").as((artist) => artist ?? "unknown")}
      />
    </box>
  );
}

export default function Player() {
  const mpris = Mpris.get_default();
  const players = bind(mpris, "players");

  const bus = Gio.DBus.session;

  return (
    <box
      cssClasses={["player"]}
      visible={players.as((ps) => ps.length > 0)}
      child={players.as((ps) => {
        if (ps.length > 0) {
          let player = Variable(ps[0]);
          let signalId: number | null = null;

          return (
            <box
              setup={() => {
                signalId = bus.signal_subscribe(
                  null, // sender (null = any)
                  "org.freedesktop.DBus.Properties", // interface
                  "PropertiesChanged", // signal name
                  "/org/mpris/MediaPlayer2", // object path
                  null, // arg0 (null = any)
                  Gio.DBusSignalFlags.NONE,
                  (
                    _connection,
                    _sender,
                    _objectPath,
                    _interfaceName,
                    _signalName,
                    params,
                  ) => {
                    let [iface, changedProps] =
                      params.deep_unpack() as unknown as any;
                    if (iface === "org.mpris.MediaPlayer2.Player") {
                      if ("PlaybackStatus" in changedProps) {
                        const activePlayers = ps.filter(
                          (player) =>
                            player.playbackStatus ===
                            Mpris.PlaybackStatus.PLAYING,
                        );
                        player.set(activePlayers[0] ?? ps[0]);
                      }
                    }
                  },
                );
              }}
              onDestroy={() =>
                signalId !== null && bus.signal_unsubscribe(signalId)
              }
              child={player(PlayerWidget)}
            ></box>
          );
        }

        return <box visible={false} />;
      })}
    />
  );
}

// <box
//   cssClasses={["cover"]}
//   valign={Gtk.Align.CENTER}
//   setup={(self) => {
//     self.set_baseline_position;
//   }}
//   child={
//     <image
//       visible={false}
//       pixelSize={64}
//       file={bind(player, "coverArt")}
//     />
//   }
// />
