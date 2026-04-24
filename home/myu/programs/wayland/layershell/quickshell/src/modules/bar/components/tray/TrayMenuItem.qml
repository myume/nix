import QtQuick
import Quickshell
import qs.common

MouseArea {
    id: root

    required property QsMenuEntry modelData
    property int padding: 8

    onClicked: {
        modelData.triggered();
    }

    implicitWidth: menuContainer.implicitWidth
    implicitHeight: menuContainer.implicitHeight

    hoverEnabled: modelData.enabled && !modelData.isSeparator

    onEntered: {
        menuContainer.color = Colors.blue;
        label.color = Colors.bgColor;
    }

    onExited: {
        menuContainer.color = "transparent";
        label.color = Colors.text;
    }

    Rectangle {
        id: menuContainer
        anchors.fill: parent
        implicitWidth: label.implicitWidth + 2 * root.padding
        implicitHeight: label.implicitHeight + root.padding
        color: "transparent"
        radius: Theme.cornerRadius / 2

        Text {
            id: label
            anchors {
                left: parent.left
                margins: root.padding
                verticalCenter: parent.verticalCenter
            }
            text: root.modelData.text
            color: Colors.text
            font: Theme.font
        }
    }
}
