import QtQuick
import Quickshell

Rectangle {
    implicitWidth: time.implicitWidth
    implicitHeight: parent.height

    color: "#cc1a1a2e"
    radius: 16

    SystemClock {
        id: clock
        precision: SystemClock.Seconds
    }

    Text {
        id: time
        text: Qt.formatDateTime(clock.date, "hh:mm:ss - yyyy-MM-dd")
        color: "white"
    }
}
