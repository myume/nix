import { execAsync } from "ags/process";

export const ScreenshotButton = () => (
  <button
    cssClasses={["screenshot-button"]}
    iconName={"accessories-screenshot-symbolic"}
    tooltipText={"Screenshot"}
    onClicked={() =>
      execAsync(["hyprshot", "-m", "region", "-o", "~/Pictures/Screenshots"])
    }
  />
);
