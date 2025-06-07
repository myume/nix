import { bind, Gio, Variable } from "astal";
import AstalMpris from "gi://AstalMpris";
import AstalApps from "gi://AstalApps";
import { Gtk } from "astal/gtk4";

const apps = new AstalApps.Apps();

function PlayerWidget(player: AstalMpris.Player) {
  const artist = bind(player, "artist");
  const hasArtist = artist.as(
    (artist) => artist !== null && artist !== undefined && artist !== "",
  );
  return (
    <box cssClasses={["player"]} spacing={6}>
      <image
        cssClasses={["icon"]}
        iconName={bind(player, "entry").as(
          (entry) => apps.exact_query(entry)[0].iconName,
        )}
      />
      <label label={bind(player, "title").as((title) => title ?? "unknown")} />
      <box visible={hasArtist} cssClasses={["separator"]} />
      <label
        visible={hasArtist}
        label={artist.as((artist) => artist ?? "unknown")}
      />
    </box>
  );
}

function PlayerControls(player: AstalMpris.Player) {
  return (
    <box cssClasses={["player-controls"]} spacing={4}>
      <button
        tooltipText={"Previous"}
        iconName={"media-skip-backward-symbolic"}
        onClicked={() => player.canGoPrevious && player.previous()}
      />
      <button
        tooltipText={bind(player, "playback_status").as((status) =>
          status === AstalMpris.PlaybackStatus.PLAYING ? "Pause" : "Play",
        )}
        iconName={bind(player, "playback_status").as((status) =>
          status === AstalMpris.PlaybackStatus.PLAYING
            ? "media-playback-pause-symbolic"
            : "media-playback-start-symbolic",
        )}
        onClicked={() => player.play_pause()}
      />
      <button
        tooltipText={"Next"}
        iconName={"media-skip-forward-symbolic"}
        onClicked={() => player.canGoNext && player.next()}
      />
    </box>
  );
}

export default function Player() {
  const mpris = AstalMpris.get_default();
  const players = bind(mpris, "players");

  const bus = Gio.DBus.session;

  return (
    <revealer
      cssClasses={["player-container"]}
      transitionDuration={1000}
      revealChild={players.as((ps) => ps.length > 0)}
      transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
      child={players.as((ps) => {
        if (ps.length > 0) {
          const player = Variable(ps[0]);
          let signalId: number | null = null;

          return (
            <box
              setup={() => {
                // wanted to get the widget to grab the most recently used/active player
                // instead of just the first one in the list.

                if (signalId) return;

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
                            AstalMpris.PlaybackStatus.PLAYING,
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
            />
          );
        }

        return <box visible={false} />;
      })}
    />
  );
}
