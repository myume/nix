import QtQuick
import "components"
import qs.common

Rectangle {
    id: root
    required property var screen

    implicitWidth: workspaces.implicitWidth
    implicitHeight: parent.height

    color: Colors.backgroundColor
    radius: 16

    Workspaces {
        id: workspaces
        screen: root.screen
    }
}
