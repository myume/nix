import QtQuick
import qs.common

Rectangle {
    id: root
    required property real percentage
    property bool horizontal: true

    color: Colors.text
    radius: Theme.cornerRadius

    Rectangle {
        anchors.bottom: parent.bottom
        anchors.left: parent.left
        radius: parent.radius
        color: Colors.blue
        implicitHeight: root.horizontal ? parent.height : parent.height * root.percentage
        implicitWidth: root.horizontal ? parent.width * root.percentage : parent.width
    }

    Behavior on percentage {
        NumberAnimation {
            duration: 100
        }
    }
}
