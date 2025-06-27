import App from "ags/gtk4/app";
import { Gdk, Gtk } from "ags/gtk4";
import style from "./style.scss";
import { Bar } from "./widget/Bar";
import { Notifications } from "./widget/Notification";
import { Launcher } from "./widget/Launcher";
import { CenterMenu } from "./widget/CenterMenu";
import { Time, timeout } from "ags/time";
import AstalMpris from "gi://AstalMpris";
import AstalWp from "gi://AstalWp";
import BrightnessService from "./Services/Brightness";
import { ControlPanelMenu, windowName } from "./widget/ControlPanel";
import { PowerMenu } from "./widget/PowerMenu";
import {
  OSD,
  OSDMode,
  OSDState,
  windowName as OSDWindowName,
} from "./widget/OSD";
import { createState, State } from "ags";

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
      timer: createState<Time | null>(null),
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

  const triggerOSD = (inputMode: OSDMode) => {
    if (App.get_window(windowName)?.is_visible()) return;

    const {
      osdState: {
        mode: [_, setMode],
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
  timeout(100, () => {
    speaker.connect("notify::volume", () => triggerOSD(OSDMode.Volume));
    speaker.connect("notify::mute", () => triggerOSD(OSDMode.Volume));
  });

  const brightness = BrightnessService.get_default();
  brightness.connect("notify::screen", () => triggerOSD(OSDMode.Brightness));

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
