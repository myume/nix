import { App, Astal, Gdk, Gtk } from "astal/gtk4";
import { SharedState } from "../../app";
import { derive } from "astal";
import { Calender } from "./Calender";
import { MediaControlMenu } from "./MediaControls";
import { hideOnClickAway } from "../../utils/util";

export function CenterMenu({
  showCalender,
  showMediaControls,
  currentPlayer,
}: SharedState) {
  const hideMenu = () => {
    showCalender.set(false);
    showMediaControls.set(false);
  };

  return (
    <window
      visible={derive([showCalender, showMediaControls])(
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
      onButtonPressed={hideOnClickAway(hideMenu)}
      keymode={Astal.Keymode.ON_DEMAND}
      focusable
      onFocusLeave={hideMenu}
      onKeyPressed={(_self, keyval) => {
        if (keyval === Gdk.KEY_Escape) hideMenu();
      }}
      child={
        <box
          cssClasses={["center-menu"]}
          halign={Gtk.Align.CENTER}
          valign={Gtk.Align.START}
          heightRequest={335}
        >
          <revealer
            revealChild={showCalender()}
            transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
            child={<Calender />}
          />
          <box
            cssClasses={["separator"]}
            visible={derive(
              [showCalender, showMediaControls],
              (showCalender, showMediaControls) =>
                showCalender && showMediaControls,
            )()}
          />
          <revealer
            revealChild={showMediaControls()}
            transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
            child={currentPlayer((player) => (
              <MediaControlMenu
                currentPlayer={player}
                setCurrentPlayer={(player) => currentPlayer.set(player)}
              />
            ))}
          />
        </box>
      }
    />
  );
}
