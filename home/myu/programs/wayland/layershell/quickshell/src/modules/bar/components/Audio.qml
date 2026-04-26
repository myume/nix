pragma ComponentBehavior: Bound
import QtQuick
import QtQuick.Layouts
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

    LazyLoader {
        id: popupLoader
        loading: true
        Popup {
            item: icon
            padding: Theme.barHpadding + 24
            ColumnLayout {
                spacing: 18

                AudioSlider {
                    node: AudioService.defaultAudioSink
                    iconName: AudioService.iconName
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
        }
    }
}
