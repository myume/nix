import QtQuick
import Quickshell
import qs.common
import "components"

Rectangle {
    id: root
    required property ShellScreen screen

    implicitWidth: workspaces.implicitWidth + Theme.barHpadding
    implicitHeight: parent.height

    color: Colors.backgroundColor
    radius: Theme.cornerRadius
    antialiasing: true

    Workspaces {
        id: workspaces
        screen: root.screen
    }
}
