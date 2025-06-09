import { App } from "astal/gtk4";
import style from "./style.scss";
import { Bar } from "./widget/Bar";
import { Notifications } from "./widget/Notification";
import { Launcher } from "./widget/Launcher";
import { CenterMenu } from "./widget/CenterMenu";
import { Variable } from "astal";

// state shared between windows
export type SharedState = {
  showMediaControls: Variable<boolean>;
  showCalender: Variable<boolean>;
};

App.start({
  css: style,
  iconTheme: "Papirus-Dark",
  main() {
    // initialize shared state
    const sharedState = {
      showMediaControls: Variable(false),
      showCalender: Variable(false),
    };

    const allMonitorWindows = [Bar(sharedState), Notifications];

    App.get_monitors().map((monitor) =>
      allMonitorWindows.map((window) => window(monitor)),
    );

    Launcher();
    CenterMenu(sharedState);
  },
});
