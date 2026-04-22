import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import Quickshell
import Quickshell.Io
import Quickshell.Wayland
import qs.common
import "apps"

PanelWindow {
    id: launcher
    WlrLayershell.namespace: "launcher"
    focusable: true

    required property ShellScreen modelData
    screen: modelData

    visible: false
    color: 'transparent'

    implicitWidth: content.implicitWidth
    implicitHeight: content.implicitHeight

    function show() {
        launcher.visible = true;
    }

    function hide() {
        launcher.visible = false;
        search.text = "";
    }

    BackgroundEffect.blurRegion: Region {
        item: content
        radius: Theme.cornerRadius
    }

    Rectangle {
        id: content
        color: Colors.backgroundColor
        radius: Theme.cornerRadius
        implicitWidth: launcher.screen.width / 2
        implicitHeight: implicitWidth / Theme.launcherAspectRatio
        antialiasing: true

        ColumnLayout {
            anchors.fill: parent
            anchors.margins: 16

            TextField {
                id: search
                Layout.fillWidth: true
                font: Theme.font
                enabled: launcher.visible
                focus: launcher.visible
                background: Rectangle {
                    radius: Theme.cornerRadius
                }
                Keys.onEscapePressed: {
                    launcher.hide();
                }
                onActiveFocusChanged: {
                    if (!activeFocus && launcher.visible) {
                        launcher.hide();
                    }
                }
            }

            App {
                Layout.fillWidth: true
                Layout.fillHeight: true
            }
        }
    }

    IpcHandler {
        target: "launcher"

        function toggle() {
            if (launcher.visible)
                launcher.hide();
            else
                launcher.show();
        }
    }
}
