import QtQuick
import "components"
import qs.common

Rectangle {
    implicitWidth: clock.implicitWidth + 24
    implicitHeight: parent.height

    color: Colors.backgroundColor
    radius: Theme.cornerRadius
    antialiasing: true

    Clock {
        id: clock
    }
}
