import { BluetoothPanel } from "./Bluetooth";
import { NetworkPanel } from "./Network";
import { PowerProfilePanel } from "./PowerProfile";
import { DoNoDisturb } from "./DoNotDisturb";

export const Panels = [
  [NetworkPanel, BluetoothPanel],
  [PowerProfilePanel, DoNoDisturb],
];
