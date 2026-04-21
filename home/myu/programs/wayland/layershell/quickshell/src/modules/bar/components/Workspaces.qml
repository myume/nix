import QtQuick
import QtQuick.Layouts
import QtQuick.Controls
import Quickshell
import qs.services
import qs.common

Rectangle {
    id: root
    required property ShellScreen screen

    anchors.centerIn: parent
    implicitWidth: workspaces.implicitWidth + 24

    RowLayout {
        id: workspaces
        anchors.centerIn: parent
        Repeater {
            model: ScriptModel {
                values: [...Niri.workspaces].filter(ws => ws.output === root.screen.name).sort((a, b) => a.idx - b.idx)
            }
            RoundButton {
                id: button
                required property var modelData
                readonly property int size: 8
                readonly property string buttonColor: {
                    modelData.is_focused ? Colors.blue : modelData.active_window_id ? Colors.lavender : Colors.overlay;
                }

                implicitWidth: modelData.is_focused ? size * 4 : size
                implicitHeight: size

                antialiasing: true

                onClicked: {
                    Niri.focusWorkspace(modelData.idx);
                }

                onHoveredChanged: {
                    if (button.hovered) {
                        dot.color = Colors.saphhire;
                    } else {
                        dot.color = buttonColor;
                    }
                }

                background: Rectangle {
                    id: dot
                    color: button.buttonColor
                    radius: button.size
                    antialiasing: true
                }
            }
        }
    }
}
