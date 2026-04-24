import QtQuick
import QtQuick.Layouts
import Quickshell.Services.SystemTray

RowLayout {
    visible: SystemTray.items.values.length > 0
    Repeater {
        model: SystemTray.items
        TrayItem {}
    }
}
