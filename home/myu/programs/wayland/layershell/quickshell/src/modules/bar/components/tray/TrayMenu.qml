pragma ComponentBehavior: Bound
import QtQuick
import QtQuick.Layouts
import Quickshell
import Quickshell.Wayland
import qs.common
import qs.components

Popup {
    id: root
    required property QsMenuHandle menu

    QsMenuOpener {
        id: opener
        menu: root.menu
    }

    ColumnLayout {
        id: menuContent
        Repeater {
            model: opener.children
            Loader {
                id: item
                Layout.fillWidth: true
                required property QsMenuEntry modelData
                readonly property Component menuItem: TrayMenuItem {
                    modelData: item.modelData
                }
                readonly property Component separator: Item {
                    Layout.fillWidth: true
                    implicitHeight: 8
                    Rectangle {
                        anchors.centerIn: parent
                        implicitWidth: parent.width
                        implicitHeight: 2
                        radius: Theme.cornerRadius
                        color: Colors.text
                        opacity: 0.1
                    }
                }

                sourceComponent: modelData.isSeparator ? separator : menuItem
            }
        }
    }
}
