import QtQuick
import QtQuick.Layouts
import QtQuick.Effects
import Quickshell
import Quickshell.Widgets
import qs.common
import qs.components

RowLayout {
    id: root
    opacity: active
    visible: false

    required property real percentage
    required property string iconName
    property bool showPercentage: false
    property bool active: false
    property bool startup: true

    signal updatePercentage(percentage: real)

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

    MouseArea {
        hoverEnabled: true
        onEntered: visibilityTimer.stop()
        onExited: visibilityTimer.restart()

        Layout.fillWidth: true
        implicitHeight: slider.height

        onClicked: mouse => {
            root.updatePercentage(mouse.x / width);
        }

        Slider {
            id: slider
            percentage: root.percentage
            implicitHeight: 10
            anchors.fill: parent
        }
    }

    Text {
        visible: root.showPercentage
        text: Math.round(root.percentage * 100)
        font: Theme.font
        color: Colors.text
    }

    function activate() {
        if (startup) {
            return startupTimer.restart();
        }

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

    // debounce the percentage changes on startup
    Timer {
        id: startupTimer
        interval: 500
        onTriggered: {
            root.startup = false;
        }
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
}
