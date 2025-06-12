import { bind, Variable } from "astal";
import { Gtk } from "astal/gtk4";
import AstalMpris from "gi://AstalMpris";
import Pango from "gi://Pango?version=1.0";
import { formatDuration, getAppIcon, toTitleCase } from "../../utils/util";

const PlayerItem = ({ player }: { player: AstalMpris.Player }) => (
  <box cssClasses={["player-item"]} spacing={4}>
    <image iconName={getAppIcon(player)} />
    <label
      label={bind(player, "entry")
        .as((entry) => entry ?? "unknown")
        .as(toTitleCase)}
    />
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
  return (
    <menubutton
      cssClasses={["player-select"]}
      child={
        <box
          cssClasses={["current-player"]}
          halign={Gtk.Align.CENTER}
          valign={Gtk.Align.CENTER}
          child={<PlayerItem player={currentPlayer} />}
        ></box>
      }
      popover={
        (
          <popover
            hasArrow={false}
            child={
              <box
                cssClasses={["players"]}
                orientation={Gtk.Orientation.VERTICAL}
                spacing={4}
              >
                {bind(mpris, "players").as((players) =>
                  players.map((player) => (
                    <button
                      onClicked={() => {
                        setCurrentPlayer(player);
                      }}
                      child={<PlayerItem player={player} />}
                    />
                  )),
                )}
              </box>
            }
          />
        ) as Gtk.Popover
      }
    />
  );
};

export const MediaControlMenu = ({
  currentPlayer,
  setCurrentPlayer,
}: {
  currentPlayer: AstalMpris.Player | null;
  setCurrentPlayer: (p: AstalMpris.Player) => void;
}) => {
  if (!currentPlayer) return <box></box>;

  // Mpris seemed to be bugged.
  // Even when the player is paused/not playing the position is ticking up
  // This is my attempt at manually fixing it
  const playbackPosition = Variable(currentPlayer.position);
  const playerPosition = bind(currentPlayer, "position");
  playerPosition.subscribe((position) => {
    const playbackStatus = currentPlayer.playback_status;

    if (playbackStatus === AstalMpris.PlaybackStatus.PLAYING) {
      playbackPosition.set(position);
    }
  });

  const appIcon = getAppIcon(currentPlayer);
  const hasCoverArt = bind(currentPlayer, "coverArt").as(
    (coverArt) =>
      coverArt !== null && coverArt !== undefined && coverArt !== "",
  );

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
      <box orientation={Gtk.Orientation.VERTICAL} halign={Gtk.Align.CENTER}>
        <box
          orientation={Gtk.Orientation.VERTICAL}
          spacing={8}
          valign={Gtk.Align.CENTER}
          vexpand
        >
          <box
            halign={Gtk.Align.CENTER}
            child={hasCoverArt.as((hasCoverArt) =>
              // there is a bug where the coverArt doesn't update correctly
              // art -> icon -> go back go to art -> expect art -> actual icon
              hasCoverArt ? (
                <image
                  cssClasses={["art"]}
                  pixelSize={128}
                  file={bind(currentPlayer, "coverArt")}
                  overflow={Gtk.Overflow.HIDDEN}
                />
              ) : (
                <image
                  cssClasses={["art"]}
                  pixelSize={128}
                  iconName={appIcon}
                  overflow={Gtk.Overflow.HIDDEN}
                />
              ),
            )}
          />
          <box
            cssClasses={["info"]}
            orientation={Gtk.Orientation.VERTICAL}
            halign={Gtk.Align.CENTER}
          >
            <label
              cssClasses={["title"]}
              label={bind(currentPlayer, "title").as(
                (title) => title ?? "unknown",
              )}
              wrap
              wrapMode={Pango.WrapMode.CHAR}
              maxWidthChars={20}
            />
            <label
              cssClasses={["artist"]}
              visible={bind(currentPlayer, "artist").as(
                (artist) =>
                  artist !== "" && artist !== null && artist !== undefined,
              )}
              label={bind(currentPlayer, "artist").as(
                (artist) => artist ?? "unknown",
              )}
              // wrap
              // wrapMode={Pango.WrapMode.WORD_CHAR}
              maxWidthChars={20}
              ellipsize={Pango.EllipsizeMode.END}
            />
          </box>
        </box>
        <box
          orientation={Gtk.Orientation.VERTICAL}
          child={
            <box
              cssClasses={["progress"]}
              visible={bind(currentPlayer, "canSeek")}
              halign={Gtk.Align.CENTER}
              orientation={Gtk.Orientation.VERTICAL}
            >
              <slider
                min={0}
                widthRequest={200}
                max={bind(currentPlayer, "length").as(Math.floor)}
                value={playbackPosition(Math.floor)}
                onChangeValue={({ value }) => currentPlayer.set_position(value)}
                overflow={Gtk.Overflow.HIDDEN}
                hexpand
              />
              <centerbox
                cssClasses={["center-progress"]}
                startWidget={<label label={playbackPosition(formatDuration)} />}
                centerWidget={
                  <box
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
                        if (currentPlayer.canGoPrevious)
                          currentPlayer.previous();
                      }}
                    />
                    <button
                      iconName={bind(currentPlayer, "playbackStatus").as(
                        (status) =>
                          status === AstalMpris.PlaybackStatus.PLAYING
                            ? "media-playback-pause-symbolic"
                            : "media-playback-start-symbolic",
                      )}
                      onClicked={() => {
                        const playbackStatus = currentPlayer.playback_status;
                        if (
                          (playbackStatus ===
                            AstalMpris.PlaybackStatus.PLAYING &&
                            currentPlayer.canPause) ||
                          (playbackStatus ===
                            AstalMpris.PlaybackStatus.PAUSED &&
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
                }
                endWidget={
                  <label
                    label={bind(currentPlayer, "length").as((length) =>
                      formatDuration(Math.max(length, 0)),
                    )}
                  />
                }
              />
            </box>
          }
        ></box>
      </box>
    </box>
  );
};
