import { bind, Variable } from "astal";
import { Gtk } from "astal/gtk4";
import AstalMpris from "gi://AstalMpris";
import AstalApps from "gi://AstalApps";
import Pango from "gi://Pango?version=1.0";

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

  const apps = new AstalApps.Apps();
  const appIcon = bind(currentPlayer, "entry").as(
    (entry) => apps.exact_query(entry)[0].iconName,
  );
  // Mpris seemed to be bugged. Even when the player is paused/not playing the position is ticking up
  const playbackPosition = Variable(currentPlayer.position);
  const playerPosition = bind(currentPlayer, "position");
  playerPosition.subscribe((position) => {
    const playbackStatus = currentPlayer.playback_status;

    if (playbackStatus === AstalMpris.PlaybackStatus.PLAYING) {
      playbackPosition.set(position);
    }
  });

  const hasCoverArt = bind(currentPlayer, "coverArt").as(
    (coverArt) =>
      coverArt !== null && coverArt !== undefined && coverArt !== "",
  );

  return (
    <box
      cssClasses={["media-control-menu"]}
      spacing={8}
      orientation={Gtk.Orientation.VERTICAL}
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.CENTER}
    >
      <box>
        <label
          label={bind(currentPlayer, "entry").as((entry) => entry ?? "unknown")}
        />
      </box>
      <box
        halign={Gtk.Align.CENTER}
        child={hasCoverArt.as((hasCoverArt) =>
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
          label={bind(currentPlayer, "title").as((title) => title ?? "unknown")}
          wrap
          wrapMode={Pango.WrapMode.WORD_CHAR}
          maxWidthChars={30}
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
          wrap
          wrapMode={Pango.WrapMode.WORD_CHAR}
          maxWidthChars={25}
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
              <label
                label={bind(currentPlayer, "length").as((length) => {
                  // poll for length
                  // idk if i care enough for this....
                  // ideally this isn't a while loop too.......
                  // if (length < 0) {
                  //   const playerName = currentPlayer.busName.replace(
                  //     "org.mpris.MediaPlayer2.",
                  //     "",
                  //   );
                  //
                  //   while (length < 0) {
                  //     try {
                  //       const result = exec([
                  //         "playerctl",
                  //         "-p",
                  //         playerName,
                  //         "metadata",
                  //         "mpris:length",
                  //       ]);
                  //       length = Math.floor(Number(result) / 1000000);
                  //     } catch (error) {
                  //       print(error);
                  //     }
                  //   }
                  // }

                  return formatDuration(Math.max(length, 0));
                })}
              />
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
