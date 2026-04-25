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
    implicitWidth: workspaces.implicitWidth

    RowLayout {
        id: workspaces
        anchors.centerIn: parent
        Repeater {
            model: ScriptModel {
                objectProp: "idx"
                values: [...Niri.workspaces].filter(ws => ws.output === root.screen.name)
            }
            RoundButton {
                id: button
                required property var modelData
                readonly property int size: 8
                readonly property string buttonColor: {
                    hovered ? Colors.sapphire : modelData.is_focused ? Colors.blue : modelData.active_window_id ? Colors.lavender : Colors.text;
                }

                implicitWidth: modelData.is_focused ? size * 4 : size
                implicitHeight: size

                Behavior on implicitWidth {
                    NumberAnimation {
                        duration: 200
                        easing.type: Easing.OutQuint
                    }
                }

                onClicked: {
                    Niri.focusWorkspace(modelData.idx);
                }

                background: Rectangle {
                    id: dot
                    color: button.buttonColor
                    opacity: button.hovered || button.modelData.is_focused || button.modelData.active_window_id ? 1.0 : 0.4
                    radius: button.size

                    Behavior on color {
                        ColorAnimation {
                            duration: 200
                            easing.type: Easing.OutQuint
                        }
                    }
                }
            }
        }
    }
}
