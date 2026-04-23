import QtQuick
import QtQuick.Layouts
import Quickshell.Services.SystemTray
import Quickshell.Widgets
import qs.common

RowLayout {
    visible: SystemTray.items.values.length > 0
    spacing: 2
    Repeater {
        model: SystemTray.items
        IconImage {
            required property SystemTrayItem modelData
            source: modelData.icon
            implicitSize: Theme.iconSize + 2
        }
    }
}
