import QtQuick
import QtQuick.Layouts
import QtQuick.Effects
import Quickshell
import Quickshell.Widgets
import qs.common

RowLayout {
    id: root
    visible: isVisible

    required property real percentage
    required property string iconName
    property bool isVisible: false

    spacing: 8

    IconImage {
        implicitSize: Theme.iconSize + 4
        source: Quickshell.iconPath(root.iconName)
        layer {
            enabled: true
            effect: MultiEffect {
                colorization: 1.0
                brightness: 0.8
                colorizationColor: Colors.text
            }
        }
    }

    Rectangle {
        Layout.fillWidth: true

        color: Colors.text
        radius: Theme.cornerRadius
        implicitHeight: 8

        Rectangle {
            radius: parent.radius
            color: Colors.blue
            implicitHeight: parent.height
            implicitWidth: parent.width * root.percentage
        }
    }

    onPercentageChanged: {
        root.isVisible = true;
        visibilityTimer.restart();
    }

    Timer {
        id: visibilityTimer
        interval: 3000
        onTriggered: {
            root.isVisible = false;
        }
    }
}
