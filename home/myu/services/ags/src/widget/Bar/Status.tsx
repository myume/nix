import Battery from "./modules/Battery";
import Network from "./modules/Network";
import Audio from "./modules/Audio";
import Brightness from "./modules/Brightness";
import Bluetooth from "./modules/Bluetooth";

export default function Status() {
  return (
    <box cssClasses={["status"]} spacing={4}>
      <Bluetooth />
      <Network />
      <Brightness />
      <Audio />
      <Battery />
    </box>
  );
}
