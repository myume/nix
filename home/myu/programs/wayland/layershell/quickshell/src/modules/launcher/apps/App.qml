import QtQuick
import QtQuick.Layouts
import Quickshell
import Quickshell.Widgets
import qs.common

ListView {
    property string placeholderText: "Search"

    spacing: 16
    model: ScriptModel {
        values: [...DesktopEntries.applications.values]
    }
    delegate: RowLayout {
        id: root
        required property DesktopEntry modelData

        spacing: 12

        IconImage {
            implicitSize: 32
            source: Quickshell.iconPath(root.modelData.icon)
        }
        ColumnLayout {
            spacing: 2
            Text {
                text: root.modelData.name
                color: Colors.text
                font.family: Theme.fontFamily
                font.weight: 600
                font.pixelSize: 16
            }
            Text {
                text: root.modelData.comment
                color: Colors.translucentText
                font.family: Theme.fontFamily
                font.weight: 500
                font.pixelSize: 12
            }
        }
    }
}
