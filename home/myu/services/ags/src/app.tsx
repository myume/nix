import App from "ags/gtk4/app";
import { Gtk } from "ags/gtk4";
import style from "./style.scss";
import { Bar } from "./widget/Bar";
import { Notifications } from "./widget/Notification";
import { Launcher } from "./widget/Launcher";
import { CenterMenu } from "./widget/CenterMenu";
import { timeout } from "ags/time";
import AstalMpris from "gi://AstalMpris";
import AstalWp from "gi://AstalWp";
import AstalBattery from "gi://AstalBattery";
import BrightnessService from "./Services/Brightness";
import { ControlPanelMenu, windowName } from "./widget/ControlPanel";
import { PowerMenu } from "./widget/PowerMenu";
import {
  OSD,
  OSDMode,
  OSDState,
  windowName as OSDWindowName,
} from "./widget/OSD";
import { createBinding, createState, State, For } from "ags";
import AstalIO from "gi://AstalIO?version=0.1";
import { execAsync } from "ags/process";
import { secondsToTimeStamp } from "./utils/util";

// state shared between windows
export type SharedState = {
  showMediaControls: State<boolean>;
  showCalender: State<boolean>;
  currentPlayer: State<AstalMpris.Player | null>;
  showControlPanel: State<boolean>;
  osdState: OSDState;
};

function main() {
  // initialize shared state
  const sharedState: SharedState = {
    showMediaControls: createState(false),
    showCalender: createState(false),
    currentPlayer: createState<AstalMpris.Player | null>(null),
    showControlPanel: createState(false),
    osdState: {
      timer: createState<AstalIO.Time | null>(null),
      mode: createState<OSDMode | null>(null),
    },
  };

  // these windows can be toggled by the bar...so initialize them first
  // order matters here
  Launcher();
  PowerMenu();
  CenterMenu(sharedState);
  ControlPanelMenu(sharedState);
  OSD(sharedState.osdState);

  const triggerOSD = (inputMode: OSDMode) => {
    if (App.get_window(windowName)?.is_visible()) return;

    const {
      osdState: {
        mode: [, setMode],
        timer: [timer, setTimer],
      },
    } = sharedState;
    setMode(inputMode);
    timer.get()?.cancel();
    setTimer(null);
    const osd = App.get_window(OSDWindowName);
    osd?.show();

    if (!timer.get()) setTimer(timeout(3000, () => osd?.hide()));
  };

  const { defaultSpeaker: speaker } = AstalWp.get_default()!;

  // timeout to avoid catching signals firing from startup
  timeout(500, () => {
    speaker.connect("notify::volume", () => triggerOSD(OSDMode.Volume));
    speaker.connect("notify::mute", () => triggerOSD(OSDMode.Volume));
  });

  const brightness = BrightnessService.get_default();
  brightness.connect("notify::screen", () => triggerOSD(OSDMode.Brightness));

  // low battery notification
  const battery = AstalBattery.get_default();
  battery.connect("notify::percentage", () => {
    if (!battery.charging) {
      const timeToEmpty = secondsToTimeStamp(battery.timeToEmpty);
      if (battery.percentage === 0.3) {
        execAsync([
          "notify-send",
          "Low Battery - 30% remaining",
          `${timeToEmpty} left before empty`,
          "-i",
          battery.batteryIconName,
        ]);
      } else if (battery.percentage === 0.2) {
        execAsync([
          "notify-send",
          "Low Battery 20% remaining",
          `${timeToEmpty} left before empty`,
          "-u",
          "critical",
          "-i",
          battery.batteryIconName,
        ]);
      } else if (battery.percentage === 0.1) {
        execAsync([
          "notify-send",
          "Low Battery - 10% remaining",
          `${timeToEmpty} left before empty`,
          "-u",
          "critical",
          "-i",
          battery.batteryIconName,
        ]);
      }
    }
  });

  const monitors = createBinding(App, "monitors");

  const allMonitorWindows = [Bar(sharedState), Notifications];
  return allMonitorWindows.map((window) => (
    <For each={monitors} cleanup={(win) => (win as Gtk.Window).destroy()}>
      {(monitor) => window(monitor)}
    </For>
  ));
}

App.start({
  css: style,
  iconTheme: "Papirus-Dark",
  main,
});
