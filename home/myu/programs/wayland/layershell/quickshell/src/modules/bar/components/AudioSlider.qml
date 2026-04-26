pragma ComponentBehavior: Bound
import QtQuick
import QtQuick.Effects
import QtQuick.Layouts
import Quickshell
import Quickshell.Widgets
import Quickshell.Services.Pipewire
import qs.common
import qs.components
import qs.services

Loader {
    id: root
    required property PwNode node

    property string iconName: node ? AudioService.iconLookup(node) : ""
    property bool expandable: false
    property bool expanded: false

    active: node && node.audio

    PwObjectTracker {
        objects: [root.node]
    }

    sourceComponent: ColumnLayout {
        MouseArea {
            Layout.preferredWidth: 280
            implicitWidth: label.implicitWidth
            implicitHeight: label.implicitHeight
            onClicked: {
                root.expanded = root.expandable && !root.expanded;
            }
            RowLayout {
                id: label

                AudioLabel {
                    id: device
                    node: root.node
                    iconName: root.iconName
                }

                IconImage {
                    visible: root.expandable
                    implicitSize: Theme.iconSize
                    source: Quickshell.iconPath("pan-end-symbolic")
                    layer {
                        enabled: true
                        effect: MultiEffect {
                            colorization: 1.0
                            brightness: 0.4
                            colorizationColor: Colors.text
                        }
                    }
                }
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
