import QtQuick
import QtQuick.Layouts
import Quickshell
import Quickshell.Widgets
import qs.common

RowLayout {
    id: root
    required property real percentage
    required property string iconName

    spacing: 8
    IconImage {
        implicitSize: Theme.iconSize + 4
        source: Quickshell.iconPath(root.iconName)
    }
    Rectangle {
        Layout.fillWidth: true

        color: Colors.text
        radius: Theme.cornerRadius
        implicitHeight: 8

        Rectangle {
            radius: parent.radius
            color: Colors.blue
            implicitHeight: parent.height
            implicitWidth: parent.width * root.percentage
        }
    }
}
