pragma ComponentBehavior: Bound
import QtQuick
import QtQuick.Layouts
import qs.common
import "components"
import "components/tray"

RowLayout {
    id: root
    implicitHeight: Theme.barHeight

    property alias playerRegion: playerContainer
    property alias contentRegion: content

    Rectangle {
        id: playerContainer
        implicitWidth: player.implicitWidth + Theme.barHpadding
        implicitHeight: parent.height

        color: Colors.backgroundColor
        radius: Theme.cornerRadius
        antialiasing: true
        visible: player.active

        Player {
            id: player
            anchors.centerIn: parent
        }
    }

    Rectangle {
        id: content
        implicitWidth: coreItems.implicitWidth + Theme.barHpadding
        implicitHeight: parent.height

        color: Colors.backgroundColor
        radius: Theme.cornerRadius
        antialiasing: true

        RowLayout {
            id: coreItems
            anchors.centerIn: parent

            Tray {}
            Network {}
            Brightness {}
            Audio {}
            Battery {}
        }
    }
}
