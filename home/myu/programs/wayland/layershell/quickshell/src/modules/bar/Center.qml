import QtQuick
import "components"
import qs.common

Rectangle {
    implicitWidth: clock.implicitWidth + 20
    implicitHeight: parent.height

    color: Theme.backgroundColor
    radius: Theme.cornerRadius

    Clock {
        id: clock
    }
}
