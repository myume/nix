import QtQuick
import QtQuick.Layouts
import Quickshell
import Quickshell.Wayland
import qs.common
import qs.services

Variants {
    model: Quickshell.screens
    PanelWindow {
        id: osd
        WlrLayershell.namespace: "osd"
        WlrLayershell.layer: WlrLayer.Overlay
        exclusionMode: ExclusionMode.Ignore

        anchors {
            bottom: true
        }

        margins {
            bottom: 4
        }

        required property ShellScreen modelData
        screen: modelData

        color: "transparent"
        implicitWidth: content.implicitWidth
        implicitHeight: content.implicitHeight

        readonly property bool active: sliders.children.some(child => child.active)
        onActiveChanged: {
            if (active) {
                visible = true;
            }
        }

        BackgroundEffect.blurRegion: Region {
            item: content
            radius: content.radius
            y: content.yOffset
        }

        Rectangle {
            id: content
            radius: Theme.cornerRadius
            color: Colors.backgroundColor

            implicitWidth: 260
            implicitHeight: sliders.implicitHeight + sliders.anchors.margins * 2

            ColumnLayout {
                id: sliders
                anchors.margins: 24
                anchors {
                    leftMargin: 24
                    rightMargin: 24
                }
                anchors.fill: parent
                spacing: 20

                OsdSlider {
                    percentage: BrightnessService.percentage
                    iconName: BrightnessService.iconName
                }
                OsdSlider {
                    percentage: AudioService.defaultAudioSink?.audio.volume ?? 0
                    iconName: AudioService.iconName
                }
            }

            // slide in animation
            property real yOffset: osd.active ? 0 : 50

            transform: Translate {
                y: content.yOffset
            }

            Behavior on yOffset {
                SpringAnimation {
                    spring: 12
                    damping: 0.5
                    epsilon: 0.25
                    easing.type: Easing.OutQuint
                    onRunningChanged: {
                        if (!running && !osd.active)
                            osd.visible = false;
                    }
                }
            }

            // expand animation
            Behavior on implicitHeight {
                NumberAnimation {
                    duration: 100
                }
            }
        }
    }
}
