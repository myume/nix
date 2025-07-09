import { Gtk } from "ags/gtk4";
import AstalMpris from "gi://AstalMpris";
import Pango from "gi://Pango";
import { formatDuration, getAppName, toTitleCase } from "../../utils/util";
import { createBinding, createState, For, onCleanup, With } from "ags";

const PlayerItem = ({ player }: { player: AstalMpris.Player }) => (
  <box cssClasses={["player-item"]} spacing={4}>
    <image iconName={getAppName(player)} />
    <label label={getAppName(player).as(toTitleCase)} />
  </box>
);

const PlayerSelect = ({
  currentPlayer,
  setCurrentPlayer,
}: {
  currentPlayer: AstalMpris.Player;
  setCurrentPlayer: (p: AstalMpris.Player) => void;
}) => {
  const mpris = AstalMpris.get_default();
  const players = createBinding(mpris, "players");
  return (
    <menubutton cssClasses={["player-select"]}>
      <box
        cssClasses={["current-player"]}
        halign={Gtk.Align.CENTER}
        valign={Gtk.Align.CENTER}
      >
        <PlayerItem player={currentPlayer} />
      </box>
      <popover hasArrow={false}>
        <box
          cssClasses={["players"]}
          orientation={Gtk.Orientation.VERTICAL}
          spacing={4}
        >
          <For each={players}>
            {(player) => (
              <button
                onClicked={() => {
                  setCurrentPlayer(player);
                }}
              >
                <PlayerItem player={player} />
              </button>
            )}
          </For>
        </box>
      </popover>
    </menubutton>
  );
};

export const MediaControlMenu = ({
  currentPlayer,
  setCurrentPlayer,
}: {
  currentPlayer: AstalMpris.Player | null;
  setCurrentPlayer: (p: AstalMpris.Player) => void;
}) => {
  if (!currentPlayer) return <box visible={false} />;

  // Mpris seemed to be bugged.
  // Even when the player is paused/not playing the position is ticking up
  // This is my attempt at manually fixing it
  const [playbackPosition, setPlaybackPosition] = createState(
    currentPlayer.position,
  );
  const playerPosition = createBinding(currentPlayer, "position");
  const dispose = playerPosition.subscribe(() => {
    const playbackStatus = currentPlayer.playback_status;

    if (playbackStatus === AstalMpris.PlaybackStatus.PLAYING) {
      setPlaybackPosition(playerPosition.get());
    }
  });

  const appIcon = getAppName(currentPlayer);
  const hasCoverArt = createBinding(currentPlayer, "coverArt").as(
    (coverArt) =>
      coverArt !== null && coverArt !== undefined && coverArt !== "",
  );

  onCleanup(() => {
    dispose();
  });

  return (
    <box
      cssClasses={["media-control-menu"]}
      spacing={10}
      orientation={Gtk.Orientation.VERTICAL}
    >
      <PlayerSelect
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
      />
      <box
        orientation={Gtk.Orientation.VERTICAL}
        halign={Gtk.Align.CENTER}
        spacing={8}
      >
        <box
          orientation={Gtk.Orientation.VERTICAL}
          spacing={8}
          valign={Gtk.Align.CENTER}
          vexpand
        >
          <box halign={Gtk.Align.CENTER}>
            <With value={hasCoverArt}>
              {(hasCoverArt) =>
                // there is a bug where the coverArt doesn't update correctly
                // art -> icon -> go back go to art -> expect art -> actual icon
                hasCoverArt ? (
                  <image
                    cssClasses={["art"]}
                    pixelSize={128}
                    file={createBinding(currentPlayer, "coverArt")}
                    overflow={Gtk.Overflow.HIDDEN}
                  />
                ) : (
                  <image
                    cssClasses={["art"]}
                    pixelSize={128}
                    iconName={appIcon}
                    overflow={Gtk.Overflow.HIDDEN}
                  />
                )
              }
            </With>
          </box>
          <box
            cssClasses={["info"]}
            orientation={Gtk.Orientation.VERTICAL}
            halign={Gtk.Align.CENTER}
          >
            <label
              cssClasses={["title"]}
              label={createBinding(currentPlayer, "title").as(
                (title) => title ?? "unknown",
              )}
              wrap
              wrapMode={Pango.WrapMode.CHAR}
              maxWidthChars={25}
            />
            <label
              cssClasses={["artist"]}
              visible={createBinding(currentPlayer, "artist").as(
                (artist) =>
                  artist !== "" && artist !== null && artist !== undefined,
              )}
              label={createBinding(currentPlayer, "artist").as(
                (artist) => artist ?? "unknown",
              )}
              // wrap
              // wrapMode={Pango.WrapMode.WORD_CHAR}
              maxWidthChars={25}
              ellipsize={Pango.EllipsizeMode.END}
            />
          </box>
        </box>
        <box orientation={Gtk.Orientation.VERTICAL}>
          <box
            cssClasses={["progress"]}
            visible={createBinding(currentPlayer, "canSeek")}
            halign={Gtk.Align.CENTER}
            orientation={Gtk.Orientation.VERTICAL}
          >
            <slider
              min={0}
              widthRequest={200}
              max={createBinding(currentPlayer, "length").as(Math.floor)}
              value={playbackPosition(Math.floor)}
              onChangeValue={({ value }) => currentPlayer.set_position(value)}
              overflow={Gtk.Overflow.HIDDEN}
              hexpand
            />
            <centerbox cssClasses={["center-progress"]}>
              <label $type="start" label={playbackPosition(formatDuration)} />
              <box
                $type="center"
                cssClasses={["controls"]}
                halign={Gtk.Align.CENTER}
                spacing={4}
                hexpand
                valign={Gtk.Align.CENTER}
                marginTop={8}
              >
                <button
                  iconName={"media-skip-backward-symbolic"}
                  onClicked={() => {
                    if (currentPlayer.canGoPrevious) currentPlayer.previous();
                  }}
                />
                <button
                  iconName={createBinding(currentPlayer, "playbackStatus").as(
                    (status) =>
                      status === AstalMpris.PlaybackStatus.PLAYING
                        ? "media-playback-pause-symbolic"
                        : "media-playback-start-symbolic",
                  )}
                  onClicked={() => {
                    const playbackStatus = currentPlayer.playback_status;
                    if (
                      (playbackStatus === AstalMpris.PlaybackStatus.PLAYING &&
                        currentPlayer.canPause) ||
                      (playbackStatus === AstalMpris.PlaybackStatus.PAUSED &&
                        currentPlayer.canPlay)
                    )
                      currentPlayer.play_pause();
                  }}
                />
                <button
                  iconName={"media-skip-forward-symbolic"}
                  onClicked={() => {
                    if (currentPlayer.canGoNext) currentPlayer.next();
                  }}
                />
              </box>
              <label
                $type="end"
                label={createBinding(currentPlayer, "length").as((length) =>
                  formatDuration(Math.max(length, 0)),
                )}
              />
            </centerbox>
          </box>
        </box>
      </box>
    </box>
  );
};
