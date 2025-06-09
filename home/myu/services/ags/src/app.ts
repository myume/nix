import { App } from "astal/gtk4";
import style from "./style.scss";
import { Bar } from "./widget/Bar";
import { Notifications } from "./widget/Notification";
import { Launcher } from "./widget/Launcher";
import { CenterMenu } from "./widget/CenterMenu";

App.start({
  css: style,
  iconTheme: "Papirus-Dark",
  main() {
    const windows = [Bar, Notifications];

    App.get_monitors().map((monitor) =>
      windows.map((window) => window(monitor)),
    );

    Launcher();
    CenterMenu();
  },
});
