pragma ComponentBehavior: Bound

import QtQuick
import QtQuick.Layouts
import Quickshell.Services.UPower
import qs.common

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

    onClicked: {
        popupLoader.active = !popupLoader.active;
    }

    Loader {
        id: popupLoader
        active: false
        sourceComponent: BatteryPopup {
            item: icon
            onIsOpenChanged: {
                if (!isOpen)
                    popupLoader.active = false;
            }
        }
    }
}
