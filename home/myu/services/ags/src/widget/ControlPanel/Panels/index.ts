import { BluetoothPanel } from "./Bluetooth";
import { NetworkPanel } from "./Network";
import { PowerProfilePanel } from "./PowerProfile";
import { DoNoDisturb } from "./DoNotDisturb";
import { Caffeine } from "./Caffeine";
import { NightLight } from "./NightLight";

export const Panels = [
  [NetworkPanel, BluetoothPanel],
  [Caffeine, NightLight],
  [PowerProfilePanel, DoNoDisturb],
];
