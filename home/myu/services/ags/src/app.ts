import { App, Gdk, Gtk } from "astal/gtk4";
import style from "./style.scss";
import { Bar } from "./widget/Bar";
import { Notifications } from "./widget/Notification";
import { Launcher } from "./widget/Launcher";
import { CenterMenu } from "./widget/CenterMenu";
import { Variable } from "astal";
import AstalMpris from "gi://AstalMpris";
import { ControlPanelMenu } from "./widget/ControlPanel";

// state shared between windows
export type SharedState = {
  showMediaControls: Variable<boolean>;
  showCalender: Variable<boolean>;
  currentPlayer: Variable<AstalMpris.Player | null>;
  showControlPanel: Variable<boolean>;
};

function main() {
  // initialize shared state
  const sharedState: SharedState = {
    showMediaControls: Variable(false),
    showCalender: Variable(false),
    currentPlayer: Variable(null),
    showControlPanel: Variable(false),
  };

  // these windows can be toggled by the bar...so initialize them first
  Launcher();
  CenterMenu(sharedState);
  ControlPanelMenu(sharedState);

  const initializedWidgets: Gtk.Window[] = [];
  const initializeBar = () => {
    const allMonitorWindows = [Bar(sharedState), Notifications];
    App.get_monitors().map((monitor) =>
      allMonitorWindows.map((window) =>
        initializedWidgets.push(window(monitor) as Gtk.Window),
      ),
    );
  };

  initializeBar();

  // handle monitor (dis)connect
  const display = Gdk.Display.get_default()?.get_monitors();
  display?.connect("items-changed", () => {
    // clear all widgets
    let widget;
    while ((widget = initializedWidgets.pop())) {
      widget.destroy();
    }

    // reinitialize them on the updated monitors
    initializeBar();
  });
}

App.start({
  css: style,
  iconTheme: "Papirus-Dark",
  main,
});
