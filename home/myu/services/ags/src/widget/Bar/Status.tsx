import Battery from "./modules/Battery";
import Network from "./modules/Network";
import Audio from "./modules/Audio";
import Brightness from "./modules/Brightness";
import Bluetooth from "./modules/Bluetooth";
import { Variable } from "astal";

export default function Status({
  showControlPanel,
}: {
  showControlPanel: Variable<boolean>;
}) {
  return (
    <button
      onClicked={() => showControlPanel.set(!showControlPanel.get())}
      child={
        <box
          cssClasses={showControlPanel((show) => [
            "status",
            show ? "toggled" : "",
          ])}
          spacing={4}
        >
          <Bluetooth />
          <Network />
          <Brightness />
          <Audio />
          <Battery />
        </box>
      }
    ></button>
  );
}
