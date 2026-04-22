import QtQuick
import Quickshell
import Quickshell.Wayland
import qs.common

PanelWindow {
    id: bar
    WlrLayershell.namespace: "bar"

    required property ShellScreen modelData
    screen: modelData

    color: "transparent"
    implicitHeight: Theme.barHeight

    margins {
        top: 4
        left: 10
        right: 10
    }

    anchors {
        top: true
        left: true
        right: true
    }

    BackgroundEffect.blurRegion: Region {
        Region {
            item: center
            radius: Theme.cornerRadius
        }
        Region {
            item: left
            radius: Theme.cornerRadius
        }
        Region {
            item: right
            radius: Theme.cornerRadius
        }
    }

    Left {
        id: left
        screen: bar.screen
        anchors.left: parent.left
    }
    Center {
        id: center
        anchors.centerIn: parent
    }
    Right {
        id: right
        anchors.right: parent.right
    }
}
