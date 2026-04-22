import QtQuick
import QtQuick.Layouts
import Quickshell
import Quickshell.Widgets
import qs.common

ListView {
    id: root
    property string placeholderText: "Search"
    required property string inputText

    spacing: 16
    model: ScriptModel {
        // TODO: order by similarity + frequency
        values: [...DesktopEntries.applications.values].filter(app => app.name.toLowerCase().startsWith(root.inputText))
    }
    delegate: RowLayout {
        id: item
        required property DesktopEntry modelData

        spacing: 12

        IconImage {
            implicitSize: 32
            source: Quickshell.iconPath(item.modelData.icon)
        }
        ColumnLayout {
            spacing: 2
            Text {
                text: item.modelData.name
                color: Colors.text
                font.family: Theme.fontFamily
                font.weight: 600
                font.pixelSize: 16
            }
            Text {
                visible: item.modelData.comment !== ""
                text: item.modelData.comment
                color: Colors.translucentText
                font.family: Theme.fontFamily
                font.weight: 500
                font.pixelSize: 12
            }
        }
    }
}
