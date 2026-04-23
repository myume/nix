import QtQuick
import QtQuick.Layouts
import Quickshell
import Quickshell.Wayland
import qs.common

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

        visible: sliders.children.some(child => child.visible)

        BackgroundEffect.blurRegion: Region {
            item: content
            radius: content.radius
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

                VolumeSlider {}
            }
        }
    }
}
