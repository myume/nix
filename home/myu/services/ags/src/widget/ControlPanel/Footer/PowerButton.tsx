import { App } from "astal/gtk4";
import { windowName } from "../../PowerMenu";

const showPowerMenu = () => App.get_window(windowName)?.show();

export const PowerButton = ({
  closeControlPanel,
}: {
  closeControlPanel: () => void;
}) => {
  return (
    <button
      cssClasses={["power-menu"]}
      tooltipText={"Power Menu"}
      iconName={"system-shutdown-symbolic"}
      onClicked={() => {
        closeControlPanel();
        showPowerMenu();
      }}
    />
  );
};
