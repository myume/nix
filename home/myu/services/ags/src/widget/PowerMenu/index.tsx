import { App, Astal, Gdk, Gtk } from "astal/gtk4";
import { hideOnClickAway } from "../../utils/util";
import { execAsync, Variable } from "astal";

export const windowName = "power-menu";

export const PowerMenu = () => {
  const reveal = Variable(false);

  const hideWindow = (window: Gtk.Window) => {
    reveal.set(false);
    window.hide();
  };

  <window
    name={windowName}
    namespace={windowName}
    cssClasses={[windowName]}
    layer={Astal.Layer.OVERLAY}
    application={App}
    anchor={
      Astal.WindowAnchor.TOP |
      Astal.WindowAnchor.BOTTOM |
      Astal.WindowAnchor.LEFT |
      Astal.WindowAnchor.RIGHT
    }
    onShow={(_self) => {
      reveal.set(true);
    }}
    onButtonPressed={(self, state) =>
      hideOnClickAway(() => hideWindow(self))(self, state)
    }
    exclusivity={Astal.Exclusivity.IGNORE}
    keymode={Astal.Keymode.ON_DEMAND}
    onKeyPressed={(self, keyval) => {
      if (keyval === Gdk.KEY_Escape) {
        hideWindow(self);
      }
    }}
    focusable
    onFocusLeave={hideWindow}
    child={
      <revealer
        halign={Gtk.Align.CENTER}
        valign={Gtk.Align.CENTER}
        revealChild={reveal()}
        child={
          <box cssClasses={["selection"]} spacing={4}>
            <button
              onClicked={() => execAsync("systemctl poweroff")}
              tooltipText={"Shutdown"}
              cssClasses={["shutdown"]}
              child={
                <image pixelSize={36} iconName={"system-shutdown-symbolic"} />
              }
            />
            <button
              cssClasses={["reboot"]}
              tooltipText={"Reboot"}
              onClicked={() => execAsync("systemctl reboot")}
              child={
                <image pixelSize={36} iconName={"system-reboot-symbolic"} />
              }
            />
            <button
              cssClasses={["suspend"]}
              tooltipText={"Suspend"}
              onClicked={() => execAsync("systemctl suspend")}
              child={
                <image pixelSize={36} iconName={"system-suspend-symbolic"} />
              }
            />
            <button
              cssClasses={["log-out"]}
              tooltipText={"Logout"}
              onClicked={() => execAsync("hyprctl dispatch exit")}
              child={
                <image pixelSize={36} iconName={"system-log-out-symbolic"} />
              }
            />
            <button
              cssClasses={["lock"]}
              tooltipText={"Lock"}
              onClicked={() => execAsync("hyprlock")}
              child={
                <image
                  pixelSize={36}
                  iconName={"system-lock-screen-symbolic"}
                />
              }
            />
          </box>
        }
      />
    }
  />;
};
