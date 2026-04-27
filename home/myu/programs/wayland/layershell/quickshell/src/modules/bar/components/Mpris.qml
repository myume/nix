pragma ComponentBehavior: Bound

import QtQuick
import QtQuick.Layouts
import QtQuick.Effects
import Quickshell
import Quickshell.Services.Mpris
import Quickshell.Widgets
import qs.services
import qs.common

MouseArea {
    id: root
    visible: active

    property bool active: !!activePlayer
    property MprisPlayer activePlayer: MprisService.activePlayer
    property int maxTitleLength: 160
    property int maxArtistLength: 120

    implicitWidth: playerStatus.implicitWidth
    implicitHeight: playerStatus.implicitHeight

    Loader {
        id: playerStatus
        active: root.active
        anchors.centerIn: parent
        sourceComponent: RowLayout {
            spacing: 8
            IconImage {
                property string iconName: MprisService.playerEntry?.icon ?? "audio-x-generic-symbolic"
                implicitSize: Theme.iconSize + 2
                source: Quickshell.iconPath(iconName)

                layer {
                    enabled: iconName.endsWith("symbolic")
                    effect: MultiEffect {
                        colorization: 1.0
                        brightness: 0.6
                        colorizationColor: Colors.text
                    }
                }
            }
            Text {
                Layout.maximumWidth: root.maxTitleLength
                text: root.activePlayer.trackTitle || "Unknown Title"
                font: Theme.font
                color: Colors.text
                elide: Text.ElideRight
            }

            Rectangle {
                id: sep
                implicitWidth: 4
                implicitHeight: 4
                radius: Theme.cornerRadius
                color: Colors.text
                opacity: 0.5
            }

            Text {
                Layout.maximumWidth: root.maxArtistLength
                text: root.activePlayer.trackArtist || "Unknown Artist"
                font: Theme.font
                color: Colors.text
                elide: Text.ElideRight
            }
        }
    }

    onClicked: {
        popupLoader.item.visible = !popupLoader.item.visible;
    }

    LazyLoader {
        id: popupLoader
        loading: true
        component: MprisPopup {
            item: playerStatus
        }
    }
}
