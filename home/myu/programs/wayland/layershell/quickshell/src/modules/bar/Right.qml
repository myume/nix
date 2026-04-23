import QtQuick
import QtQuick.Layouts
import qs.common
import "components"

Rectangle {
    implicitWidth: content.implicitWidth + 24
    implicitHeight: parent.height

    color: Colors.backgroundColor
    radius: Theme.cornerRadius
    antialiasing: true

    RowLayout {
        id: content
        anchors.centerIn: parent

        Tray {}
        Network {}
        Brightness {}
        Audio {}
        Battery {}
    }
}
