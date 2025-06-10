import { App } from "astal/gtk4";
import style from "./style.scss";
import { Bar } from "./widget/Bar";
import { Notifications } from "./widget/Notification";
import { Launcher } from "./widget/Launcher";
import { CenterMenu } from "./widget/CenterMenu";
import { Variable } from "astal";
import AstalMpris from "gi://AstalMpris";

// state shared between windows
export type SharedState = {
  showMediaControls: Variable<boolean>;
  showCalender: Variable<boolean>;
  currentPlayer: Variable<AstalMpris.Player | null>;
};

App.start({
  css: style,
  iconTheme: "Papirus-Dark",
  main() {
    // initialize shared state
    const sharedState: SharedState = {
      showMediaControls: Variable(false),
      showCalender: Variable(false),
      currentPlayer: Variable(null),
    };

    const allMonitorWindows = [Bar(sharedState), Notifications];

    App.get_monitors().map((monitor) =>
      allMonitorWindows.map((window) => window(monitor)),
    );

    Launcher();
    CenterMenu(sharedState);
  },
});
