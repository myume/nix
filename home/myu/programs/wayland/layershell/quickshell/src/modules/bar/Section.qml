import QtQuick
import QtQuick.Layouts
import qs.common

Rectangle {
    id: root

    default property alias children: content.data

    implicitWidth: content.implicitWidth + (content.implicitWidth > 0) * Theme.barHpadding
    implicitHeight: parent.implicitHeight

    color: Colors.backgroundColor
    radius: Theme.cornerRadius

    RowLayout {
        id: content
        anchors.centerIn: parent
    }
}
