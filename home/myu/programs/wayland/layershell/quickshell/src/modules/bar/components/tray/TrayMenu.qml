pragma ComponentBehavior: Bound
import QtQuick
import QtQuick.Layouts
import Quickshell
import Quickshell.Wayland
import qs.common

PanelWindow {
    id: root
    color: "transparent"
    required property QsMenuHandle menu
    property int padding: 18

    property point pos

    focusable: true

    property alias activeFocus: menuList.activeFocus

    WlrLayershell.namespace: "popup"
    WlrLayershell.exclusionMode: ExclusionMode.Ignore

    implicitWidth: menuList.implicitWidth
    implicitHeight: menuList.implicitHeight

    margins {
        top: Theme.barHeight + 8
        right: Math.max(screen.width - pos.x - implicitWidth, 8)
    }

    anchors {
        top: true
        right: true
    }

    BackgroundEffect.blurRegion: Region {
        item: menuList
        radius: Theme.cornerRadius
    }

    Rectangle {
        id: menuList
        focus: true
        implicitWidth: menuContent.implicitWidth + root.padding
        implicitHeight: menuContent.implicitHeight + root.padding
        radius: Theme.cornerRadius
        color: Colors.backgroundColor

        QsMenuOpener {
            id: opener
            menu: root.menu
        }

        ColumnLayout {
            id: menuContent
            anchors.centerIn: parent
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
}
