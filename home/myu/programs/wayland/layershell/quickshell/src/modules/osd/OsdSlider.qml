import QtQuick
import QtQuick.Layouts
import QtQuick.Effects
import Quickshell
import Quickshell.Widgets
import qs.common

RowLayout {
    id: root
    opacity: active

    required property real percentage
    required property string iconName
    property bool active: false

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

    function activate() {
        root.active = true;
        root.visible = true;
        visibilityTimer.restart();
    }

    onIconNameChanged: {
        activate();
    }

    onPercentageChanged: {
        activate();
    }

    Timer {
        id: visibilityTimer
        interval: 3000
        onTriggered: {
            root.active = false;
        }
    }

    Behavior on opacity {
        NumberAnimation {
            duration: 100
            onRunningChanged: {
                if (!running && !root.active) {
                    root.visible = false;
                }
            }
        }
    }
    Behavior on percentage {
        NumberAnimation {
            duration: 100
        }
    }
}
