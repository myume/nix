pragma ComponentBehavior: Bound
import QtQuick
import QtQuick.Layouts
import QtQuick.Controls
import QtQuick.Effects
import Quickshell
import Quickshell.Widgets
import Quickshell.Services.Pipewire
import qs.common
import qs.services
import qs.components

MouseArea {
    id: root

    implicitWidth: icon.implicitWidth
    implicitHeight: icon.implicitHeight

    IconImage {
        id: icon
        implicitSize: Theme.iconSize
        source: Quickshell.iconPath(AudioService.iconName)

        layer {
            enabled: true
            effect: MultiEffect {
                colorization: 1.0
                brightness: 0.2
                colorizationColor: Colors.text
            }
        }
    }

    onClicked: popupLoader.item.visible = !popupLoader.item.visible
    property bool showSinkSelector: false

    readonly property Component selector: ColumnLayout {
        spacing: 8

        RowLayout {
            MouseArea {
                hoverEnabled: true
                onClicked: {
                    root.showSinkSelector = false;
                }
                implicitWidth: backIcon.implicitWidth
                implicitHeight: backIcon.implicitHeight

                IconImage {
                    id: backIcon
                    implicitSize: Theme.iconSize
                    source: Quickshell.iconPath("pan-start-symbolic")
                    layer {
                        enabled: true
                        effect: MultiEffect {
                            colorization: 1.0
                            brightness: 0.5
                            colorizationColor: Colors.text
                        }
                    }
                }
            }
            Text {
                text: root.showSinkSelector ? "Output Devices" : ""
                font.family: Theme.fontFamily
                font.weight: 700
                font.pixelSize: 14
                color: Colors.text
            }
        }

        Rectangle {
            visible: selectorItems.count > 0
            Layout.fillWidth: true
            implicitHeight: 2
            color: Colors.blue
            opacity: 0.2
            radius: Theme.cornerRadius
        }

        ListView {
            id: selectorItems
            spacing: 8
            implicitWidth: 280
            implicitHeight: contentHeight
            model: ScriptModel {
                values: Pipewire.nodes.values.filter(node => node.type === PwNodeType.AudioSink)
            }
            delegate: ItemDelegate {
                id: item

                required property PwNode modelData
                readonly property string name: modelData?.nickname || modelData?.description || modelData?.name || "Unknown"

                hoverEnabled: true
                highlighted: hovered || modelData.id === AudioService.defaultAudioSink?.id

                background: Rectangle {
                    radius: Theme.cornerRadius / 2
                    color: item.highlighted ? Colors.blue : "transparent"
                    opacity: 0.2
                }

                onClicked: {
                    if (root.showSinkSelector) {
                        Pipewire.preferredDefaultAudioSink = item.modelData;
                    }
                }

                contentItem: AudioLabel {
                    id: label
                    node: item.modelData
                }
            }
        }
    }

    readonly property Component mixer: ColumnLayout {
        spacing: 16

        AudioSlider {
            id: sinkSlider
            node: AudioService.defaultAudioSink
            iconName: AudioService.iconName
            expandable: true
            expanded: root.showSinkSelector
            onExpandedChanged: {
                root.showSinkSelector = expanded;
            }
        }

        AudioSlider {
            node: Pipewire.defaultAudioSource
            iconName: "audio-input-microphone-symbolic"
        }

        Rectangle {
            id: sep
            visible: clients.count > 0
            Layout.fillWidth: true
            implicitHeight: 2
            color: Colors.blue
            opacity: 0.2
            radius: Theme.cornerRadius
        }

        Repeater {
            id: clients
            model: AudioService.linkTracker.linkGroups
            AudioSlider {
                required property PwLinkGroup modelData
                node: modelData?.source ?? null
            }
        }
    }

    LazyLoader {
        id: popupLoader
        loading: true
        component: Popup {
            item: icon
            padding: Theme.barHpadding + 16
            onVisibleChanged: {
                if (!visible) {
                    root.showSinkSelector = false;
                }
            }
            Loader {
                sourceComponent: root.showSinkSelector ? root.selector : root.mixer
            }
        }
    }
}
