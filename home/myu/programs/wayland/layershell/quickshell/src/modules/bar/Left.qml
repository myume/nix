import QtQuick
import Quickshell
import qs.common
import "components"

Rectangle {
    id: root
    required property ShellScreen screen

    implicitWidth: workspaces.implicitWidth
    implicitHeight: parent.height

    color: Colors.backgroundColor
    radius: 16

    Workspaces {
        id: workspaces
        screen: root.screen
    }
}
