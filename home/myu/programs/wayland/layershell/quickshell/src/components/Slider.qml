import QtQuick
import qs.common

Rectangle {
    id: root
    required property real percentage

    color: Colors.text
    radius: Theme.cornerRadius

    Rectangle {
        radius: parent.radius
        color: Colors.blue
        implicitHeight: parent.height
        implicitWidth: parent.width * root.percentage
    }
}
