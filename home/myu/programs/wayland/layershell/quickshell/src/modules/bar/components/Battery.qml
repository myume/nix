import QtQuick
import QtQuick.Layouts
import Quickshell.Services.UPower
import Quickshell.Widgets
import Quickshell
import qs.common

RowLayout {
    id: root

    implicitHeight: content.implicitHeight
    implicitWidth: content.implicitWidth
    readonly property var battery: UPower.displayDevice

    Text {
        id: content
        text: `${root.battery.percentage * 100}%`
        color: Colors.text
        font: Theme.font
    }
    IconImage {
        implicitSize: Theme.iconSize
        source: Quickshell.iconPath(root.battery.iconName)
    }
}
