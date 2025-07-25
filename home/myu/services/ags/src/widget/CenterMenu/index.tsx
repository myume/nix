import App from "ags/gtk4/app";
import { Astal, Gdk, Gtk } from "ags/gtk4";
import { SharedState } from "../../app";
import { CalendarView } from "./Calender";
import { MediaControlMenu } from "./MediaControls";
import { hideOnClickAway } from "../../utils/util";
import { createComputed, With } from "ags";

export function CenterMenu({
  showCalender: [showCalender, setShowCalender],
  showMediaControls: [showMediaControls, setShowMediaControls],
  currentPlayer: [currentPlayer, setCurrentPlayer],
}: SharedState) {
  const hideMenu = () => {
    setShowCalender(false);
    setShowMediaControls(false);
  };

  let window: Astal.Window;

  return (
    <window
      $={(self) => {
        window = self;
      }}
      visible={createComputed([showCalender, showMediaControls])(
        ([showCalender, showMediaControls]) =>
          showCalender || showMediaControls,
      )}
      namespace={"center-menu"}
      layer={Astal.Layer.TOP}
      exclusivity={Astal.Exclusivity.NORMAL}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT |
        Astal.WindowAnchor.BOTTOM
      }
      application={App}
      keymode={Astal.Keymode.ON_DEMAND}
      focusable
    >
      <Gtk.EventControllerFocus onLeave={hideMenu} />
      <Gtk.GestureClick
        onPressed={(_self, _, x, y) => hideOnClickAway(hideMenu)(window, x, y)}
      />
      <Gtk.EventControllerKey
        onKeyPressed={(_self, keyval, _keycode, _state) => {
          if (keyval === Gdk.KEY_Escape) hideMenu();
        }}
      />
      <box
        cssClasses={["center-menu"]}
        halign={Gtk.Align.CENTER}
        valign={Gtk.Align.START}
        heightRequest={350}
      >
        <revealer
          revealChild={showCalender}
          transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
        >
          <CalendarView />
        </revealer>
        <box
          cssClasses={["separator"]}
          visible={createComputed(
            [showCalender, showMediaControls],
            (showCalender, showMediaControls) =>
              showCalender && showMediaControls,
          )}
        />
        <revealer
          revealChild={showMediaControls}
          transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
        >
          <With value={currentPlayer}>
            {(player) => (
              <MediaControlMenu
                currentPlayer={player}
                setCurrentPlayer={setCurrentPlayer}
              />
            )}
          </With>
        </revealer>
      </box>
    </window>
  );
}
