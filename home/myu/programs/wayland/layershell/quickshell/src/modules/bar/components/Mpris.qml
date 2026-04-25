pragma ComponentBehavior: Bound

import QtQuick
import QtQuick.Layouts
import Quickshell.Services.Mpris
import qs.services
import qs.common

Item {
    id: root
    visible: active

    property bool active: !!activePlayer
    property MprisPlayer activePlayer: MprisService.activePlayer
    property int maxTitleLength: 14
    property int maxArtistLength: 14

    implicitWidth: content.implicitWidth

    function elideToLength(s, length) {
        if (s.length <= length) {
            return s;
        }
        return s.slice(0, length) + "...";
    }

    Loader {
        id: content
        active: root.active
        anchors.centerIn: parent
        sourceComponent: RowLayout {
            spacing: 8
            Text {
                text: root.elideToLength(root.activePlayer.trackTitle, root.maxTitleLength) || "Unknown Title"
                font.family: Theme.fontFamily
                font.pixelSize: Theme.font.pixelSize
                color: Colors.text
            }

            Rectangle {
                implicitWidth: 4
                implicitHeight: 4
                radius: Theme.cornerRadius
                color: Colors.text
            }

            Text {
                text: root.elideToLength(root.activePlayer.trackArtist, root.maxArtistLength) || "Unknown Artist"
                font.family: Theme.fontFamily
                font.pixelSize: Theme.font.pixelSize
                color: Colors.text
            }
        }
    }
}
