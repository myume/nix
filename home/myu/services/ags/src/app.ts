import { App } from "astal/gtk4";
import style from "./style.scss";
import { Bar } from "./widget/Bar";
import { Notifications } from "./widget/Notification";

App.start({
  css: style,
  iconTheme: "Papirus-Dark",
  main() {
    App.get_monitors().map(Bar);
    App.get_monitors().map(Notifications);
  },
});
