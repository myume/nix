import AstalMpris from "gi://AstalMpris";
import { Gtk } from "ags/gtk4";
import Pango from "gi://Pango";
import { getAppIcon } from "../../../utils/util";
import { createBinding, State, With } from "ags";
import Gio from "gi://Gio";

const PlayerWidget =
  ({
    mediaControlState: [showMediaControls, setMediaControls],
  }: {
    mediaControlState: State<boolean>;
  }) =>
  (player: AstalMpris.Player) => {
    const artist = createBinding(player, "artist");
    const hasArtist = artist.as(
      (artist) => artist !== null && artist !== undefined && artist !== "",
    );
    return (
      <button onClicked={() => setMediaControls(!showMediaControls.get())}>
        <box
          cssClasses={showMediaControls((show) => [
            "player",
            show ? "toggled" : "",
          ])}
          spacing={6}
        >
          <image cssClasses={["icon"]} iconName={getAppIcon(player)} />
          <label
            label={createBinding(player, "title").as(
              (title) => title ?? "unknown",
            )}
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
      </button>
    );
  };

export default function Player({
  mediaControlState,
  currentPlayer: [currentPlayer, setCurrentPlayer],
}: {
  mediaControlState: State<boolean>;
  currentPlayer: State<AstalMpris.Player | null>;
}) {
  const mpris = AstalMpris.get_default();
  const players = createBinding(mpris, "players");
  const [, setMediaControls] = mediaControlState;

  const bus = Gio.DBus.session;
  players.subscribe(() => {
    if (players.get().length === 0) setMediaControls(false);
  });

  return (
    <revealer
      cssClasses={["player-container"]}
      transitionDuration={1000}
      revealChild={players.as((ps) => ps.length > 0)}
      transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
      marginStart={players.as((ps) => (ps.length > 0 ? 4 : 0))}
    >
      <With value={players}>
        {(ps) => {
          if (ps.length > 0) {
            setCurrentPlayer(ps[0]);
            let signalId: number | null = null;

            return (
              <box
                $={() => {
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
                          setCurrentPlayer(
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
              >
                <With value={currentPlayer}>
                  {(player) =>
                    player ? (
                      PlayerWidget({ mediaControlState })(player)
                    ) : (
                      <box visible={false} />
                    )
                  }
                </With>
              </box>
            );
          }

          return <box visible={false} />;
        }}
      </With>
    </revealer>
  );
}
