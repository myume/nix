import QtQuick
import QtQuick.Layouts
import Quickshell
import Quickshell.Wayland
import qs.common

PanelWindow {
    id: bar
    WlrLayershell.namespace: "bar"

    required property var modelData
    screen: modelData

    color: "transparent"
    implicitHeight: 28

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

    RowLayout {
        anchors.fill: parent

        Left {
            id: left
            screen: bar.screen
        }
        Item {
            Layout.fillWidth: true
        }
        Center {
            id: center
        }
        Item {
            Layout.fillWidth: true
        }
        Right {
            id: right
        }
    }
}
