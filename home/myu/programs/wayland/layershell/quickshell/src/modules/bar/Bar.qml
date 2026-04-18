import QtQuick
import QtQuick.Layouts
import Quickshell
import Quickshell.Wayland

PanelWindow {
    id: bar
    WlrLayershell.namespace: "bar"

    required property var modelData
    screen: modelData

    color: "transparent"
    height: 28

    margins {
        top: 8
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
            shape: RegionShape.Ellipse
            item: leftbar
        }
    }

    RowLayout {
        anchors.fill: parent

        Left {
            id: leftbar
        }
        Item {
            Layout.fillWidth: true
        }
        Center {}
        Item {
            Layout.fillWidth: true
        }
        Right {}
    }
}
