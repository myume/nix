import QtQuick
import QtQuick.Layouts
import qs.common
import "components"

Rectangle {
    implicitWidth: content.implicitWidth + 24
    implicitHeight: parent.height

    color: Colors.backgroundColor
    radius: Theme.cornerRadius

    RowLayout {
        id: content
        anchors.centerIn: parent

        Tray {}
        Volume {}
        Battery {}
    }
}
