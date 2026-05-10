import QtQuick
import QtQuick.Layouts
import Quickshell.Services.SystemTray

RowLayout {
    property bool active: SystemTray.items.values.length > 0
    Repeater {
        model: SystemTray.items
        TrayItem {}
    }
}
