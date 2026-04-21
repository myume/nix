import QtQuick
import QtQuick.Layouts
import Quickshell.Services.SystemTray
import Quickshell.Widgets
import qs.common

RowLayout {
    Repeater {
        model: SystemTray.items
        IconImage {
            required property SystemTrayItem modelData
            source: modelData.icon
            implicitSize: Theme.iconSize
        }
    }
}
