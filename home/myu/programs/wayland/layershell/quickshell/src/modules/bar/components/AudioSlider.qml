pragma ComponentBehavior: Bound
import QtQuick
import QtQuick.Effects
import QtQuick.Layouts
import Quickshell
import Quickshell.Widgets
import Quickshell.Services.Pipewire
import qs.common
import qs.services
import qs.components

Loader {
    id: root
    required property PwNode node
    property string iconName: node ? AudioService.iconLookup(node) : ""
    property string name: node?.description || node?.name || "Unknown"

    active: node && node.audio

    PwObjectTracker {
        objects: [root.node]
    }

    sourceComponent: ColumnLayout {
        RowLayout {
            IconImage {
                implicitSize: Theme.iconSize
                source: Quickshell.iconPath(root.iconName)
                layer {
                    enabled: root.iconName.endsWith("symbolic")
                    effect: MultiEffect {
                        colorization: 1.0
                        brightness: 0.4
                        colorizationColor: Colors.text
                    }
                }
            }
            Text {
                Layout.preferredWidth: 240
                text: root.name
                elide: Text.ElideRight
                font: Theme.font
                color: Colors.text
            }
        }

        MouseArea {
            hoverEnabled: true

            Layout.fillWidth: true
            implicitHeight: slider.height

            onClicked: mouse => {
                root.node.audio.volume = mouse.x / width;
            }

            Slider {
                id: slider
                anchors.fill: parent
                implicitHeight: 8
                percentage: root.node.audio.volume
            }
        }
    }
}
