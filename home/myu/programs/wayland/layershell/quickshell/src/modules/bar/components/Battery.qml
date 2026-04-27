pragma ComponentBehavior: Bound

import QtQuick
import QtQuick.Layouts
import QtQuick.Effects
import Quickshell.Services.UPower
import Quickshell
import Quickshell.Widgets
import qs.common
import qs.components

MouseArea {
    id: root

    readonly property var battery: UPower.displayDevice
    readonly property double percentage: Math.round(root.battery.percentage * 100)

    implicitWidth: icon.implicitWidth
    implicitHeight: icon.implicitHeight

    RowLayout {
        id: icon

        visible: root.battery
        spacing: 0

        BatteryIcon {}
        Text {
            text: `${root.percentage}%`
            color: Colors.text
            font: Theme.font
        }
    }

    onClicked: popupLoader.item.visible = !popupLoader.item.visible

    LazyLoader {
        id: popupLoader
        loading: true
        component: BatteryPopup {
            item: icon
        }
    }
}
