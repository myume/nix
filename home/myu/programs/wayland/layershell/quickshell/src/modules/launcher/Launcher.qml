import QtQuick
import Quickshell
import Quickshell.Io
import Quickshell.Wayland
import qs.common

PanelWindow {
    id: launcher
    WlrLayershell.namespace: "launcher"

    required property ShellScreen modelData
    screen: modelData

    visible: false
    color: 'transparent'

    implicitWidth: content.implicitWidth
    implicitHeight: content.implicitHeight

    BackgroundEffect.blurRegion: Region {
        item: content
        radius: Theme.cornerRadius
    }

    Rectangle {
        id: content
        color: Colors.backgroundColor
        radius: Theme.cornerRadius
        implicitWidth: launcher.screen.width / 2
        implicitHeight: implicitWidth / Theme.launcher.aspectRatio
        antialiasing: true
    }

    IpcHandler {
        target: "launcher"

        function toggle() {
            launcher.visible = !launcher.visible;
        }
    }
}
