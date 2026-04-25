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

    implicitWidth: content.implicitWidth

    function elideToLength(s, length) {
        if (s.length <= length) {
            return s;
        }
        return s.slice(0, length) + "...";
    }

    Loader {
        id: content
        active: !!root.activePlayer
        anchors.centerIn: parent
        sourceComponent: RowLayout {
            Text {
                text: root.elideToLength(root.activePlayer.trackTitle, 16) || "Unknown Title"
                font: Theme.font
                color: Colors.text
            }
            Text {
                text: root.elideToLength(root.activePlayer.trackArtist, 12) || "Unknown Artist"
                font: Theme.font
                color: Colors.text
            }
        }
    }
}
