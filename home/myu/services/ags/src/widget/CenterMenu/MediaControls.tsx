import { bind, derive, Variable } from "astal";
import { Gtk } from "astal/gtk4";
import AstalMpris from "gi://AstalMpris";

function formatDuration(length: number) {
  const totalSeconds = Math.floor(length);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
}

export const MediaControlMenu = ({
  currentPlayer,
}: {
  currentPlayer: AstalMpris.Player | null;
}) => {
  if (!currentPlayer) return <box></box>;

  // Mpris seemed to be bugged. Even when the player is paused/not playing the position is ticking up
  const playbackPosition = Variable(currentPlayer.position);
  const playerPosition = bind(currentPlayer, "position");
  playerPosition.subscribe((position) => {
    const playbackStatus = currentPlayer.playback_status;

    if (playbackStatus === AstalMpris.PlaybackStatus.PLAYING) {
      playbackPosition.set(position);
    }
  });

  return (
    <box
      cssClasses={["media-control-menu"]}
      spacing={8}
      orientation={Gtk.Orientation.VERTICAL}
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.CENTER}
    >
      <box
        halign={Gtk.Align.CENTER}
        child={
          <image
            cssClasses={["art"]}
            pixelSize={169}
            file={bind(currentPlayer, "coverArt")}
            overflow={Gtk.Overflow.HIDDEN}
          />
        }
      />
      <box
        cssClasses={["info"]}
        orientation={Gtk.Orientation.VERTICAL}
        halign={Gtk.Align.CENTER}
      >
        <label
          label={bind(currentPlayer, "title").as((title) => title ?? "unknown")}
        />
        <label
          label={bind(currentPlayer, "artist").as(
            (artist) => artist ?? "unknown",
          )}
        />
      </box>
      <box orientation={Gtk.Orientation.VERTICAL}>
        <box
          cssClasses={["progress"]}
          visible={bind(currentPlayer, "canSeek")}
          halign={Gtk.Align.CENTER}
          orientation={Gtk.Orientation.VERTICAL}
          widthRequest={200}
        >
          <slider
            min={0}
            max={bind(currentPlayer, "length").as(Math.floor)}
            value={playbackPosition(Math.floor)}
            onChangeValue={({ value }) => currentPlayer.set_position(value)}
            overflow={Gtk.Overflow.HIDDEN}
            hexpand
          />
          <centerbox
            startWidget={<label label={playbackPosition(formatDuration)} />}
            centerWidget={<box hexpand />}
            endWidget={
              <label label={bind(currentPlayer, "length").as(formatDuration)} />
            }
          />
        </box>
        <box cssClasses={["controls"]} halign={Gtk.Align.CENTER} spacing={4}>
          <button
            iconName={"media-skip-backward-symbolic"}
            onClicked={() => {
              if (currentPlayer.canGoPrevious) currentPlayer.previous();
            }}
          />
          <button
            iconName={bind(currentPlayer, "playbackStatus").as((status) =>
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
      </box>
    </box>
  );
};
