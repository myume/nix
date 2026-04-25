import QtQuick
import QtQuick.Layouts
import "components"
import qs.common

Rectangle {
    implicitWidth: clock.implicitWidth + Theme.barHpadding
    implicitHeight: parent.height

    color: Colors.backgroundColor
    radius: Theme.cornerRadius
    antialiasing: true

    Clock {
        id: clock
        anchors.centerIn: parent
    }
}
