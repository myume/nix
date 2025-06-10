import { bind, Gio, Variable } from "astal";
import AstalMpris from "gi://AstalMpris";
import AstalApps from "gi://AstalApps";
import { Gtk } from "astal/gtk4";
import Pango from "gi://Pango?version=1.0";

const PlayerWidget =
  (showMediaControls: Variable<boolean>) => (player: AstalMpris.Player) => {
    const apps = new AstalApps.Apps();
    const artist = bind(player, "artist");
    const hasArtist = artist.as(
      (artist) => artist !== null && artist !== undefined && artist !== "",
    );
    return (
      <button
        onClicked={() => showMediaControls.set(!showMediaControls.get())}
        child={
          <box
            cssClasses={showMediaControls((show) => [
              "player",
              show ? "toggled" : "",
            ])}
            spacing={6}
          >
            <image
              cssClasses={["icon"]}
              iconName={bind(player, "entry").as(
                (entry) => apps.exact_query(entry)[0].iconName,
              )}
            />
            <label
              label={bind(player, "title").as((title) => title ?? "unknown")}
              useMarkup
              ellipsize={Pango.EllipsizeMode.END}
              maxWidthChars={40}
            />
            <box visible={hasArtist} cssClasses={["separator"]} />
            <label
              visible={hasArtist}
              label={artist.as((artist) => artist ?? "unknown")}
              ellipsize={Pango.EllipsizeMode.END}
              maxWidthChars={40}
            />
          </box>
        }
      />
    );
  };

export default function Player({
  showMediaControls,
  currentPlayer,
}: {
  showMediaControls: Variable<boolean>;
  currentPlayer: Variable<AstalMpris.Player | null>;
}) {
  const mpris = AstalMpris.get_default();
  const players = bind(mpris, "players");

  const bus = Gio.DBus.session;
  players.subscribe((players) => {
    if (players.length === 0) showMediaControls.set(false);
  });

  return (
    <revealer
      cssClasses={["player-container"]}
      transitionDuration={1000}
      revealChild={players.as((ps) => ps.length > 0)}
      transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
      child={players.as((ps) => {
        if (ps.length > 0) {
          currentPlayer.set(ps[0]);
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
                        currentPlayer.set(
                          activePlayers[0] ?? currentPlayer.get() ?? ps[0],
                        );
                      }
                    }
                  },
                );
              }}
              onDestroy={() =>
                signalId !== null && bus.signal_unsubscribe(signalId)
              }
              child={currentPlayer((player) =>
                player ? (
                  PlayerWidget(showMediaControls)(player)
                ) : (
                  <box visible={false} />
                ),
              )}
            />
          );
        }

        return <box visible={false} />;
      })}
    />
  );
}
