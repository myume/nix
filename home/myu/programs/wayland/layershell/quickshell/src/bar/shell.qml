// shell.qml
import Quickshell
import Quickshell.Wayland
import QtQuick

ShellRoot {
    PanelWindow {
        id: win
        anchors.top: true
        anchors.left: true
        anchors.right: true
        implicitHeight: 48
        color: "transparent"

        BackgroundEffect.blurRegion: Region {
            Region {
                item: left
            }
            Region {
                item: center
            }
            Region {
                item: right
            }
        }

        Rectangle {
            id: left
            x: 8
            y: 8
            width: 120
            height: 32
            radius: 8
            color: Qt.rgba(0.1, 0.1, 0.1, 0.6)
            Text {
                anchors.centerIn: parent
                text: "left"
                color: "white"
            }
        }

        Rectangle {
            id: center
            y: 8
            anchors.horizontalCenter: parent.horizontalCenter
            width: 120
            height: 32
            radius: 8
            color: Qt.rgba(0.1, 0.1, 0.1, 0.6)
            Text {
                anchors.centerIn: parent
                text: "center"
                color: "white"
            }
        }

        Rectangle {
            id: right
            x: parent.width - width - 8
            y: 8
            width: 120
            height: 32
            radius: 8
            color: Qt.rgba(0.1, 0.1, 0.1, 0.6)
            Text {
                anchors.centerIn: parent
                text: "right"
                color: "white"
            }
        }
    }
}
