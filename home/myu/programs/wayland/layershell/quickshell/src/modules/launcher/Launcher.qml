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
        app.currentIndex = 0;
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
            spacing: 16

            TextField {
                id: search
                Layout.fillWidth: true
                enabled: launcher.visible
                focus: launcher.visible

                font.family: Theme.fontFamily
                font.weight: 500
                font.pixelSize: 16
                color: Colors.text
                placeholderText: `${app.placeholderText}...`
                placeholderTextColor: Colors.translucentText

                padding: 14

                background: Rectangle {
                    radius: Theme.cornerRadius
                    color: Colors.lavender
                    opacity: 0.2
                }

                Keys.onEscapePressed: {
                    launcher.hide();
                }
                Keys.onPressed: event => {
                    app.onKeyPressed(event);
                }

                onActiveFocusChanged: {
                    if (!activeFocus) {
                        launcher.hide();
                    }
                }
            }

            App {
                id: app
                inputText: search.text
                Layout.fillWidth: true
                Layout.fillHeight: true
                onLaunchedApp: {
                    launcher.hide();
                }
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
