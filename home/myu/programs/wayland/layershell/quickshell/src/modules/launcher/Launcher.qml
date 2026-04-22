import QtQuick
import Quickshell
import Quickshell.Io
import Quickshell.Wayland

PanelWindow {
    id: launcher
    WlrLayershell.namespace: "launcher"

    required property ShellScreen modelData
    screen: modelData

    visible: false
    implicitHeight: 64

    Text {
        text: "launcher"
    }

    IpcHandler {
        target: "launcher"

        function toggle() {
            launcher.visible = !launcher.visible;
        }
    }
}
