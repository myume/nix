import { BluetoothPanel } from "./Bluetooth";
import { NetworkPanel } from "./Network";
import { PowerProfilePanel } from "./PowerProfile";
import { DoNoDisturb } from "./DoNotDisturb";
import { Caffeine } from "./Caffeine";

export const Panels = [
  [NetworkPanel, BluetoothPanel],
  [Caffeine, Caffeine],
  [PowerProfilePanel, DoNoDisturb],
];
