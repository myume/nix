pragma ComponentBehavior: Bound

import QtQuick
import QtQuick.Layouts
import QtQuick.Effects
import Quickshell.Services.UPower
import Quickshell
import Quickshell.Widgets
import qs.common

RowLayout {
    id: root

    readonly property var battery: UPower.displayDevice
    readonly property double percentage: Math.round(root.battery.percentage * 100)
    readonly property bool isCharging: battery.state === UPowerDeviceState.Charging

    visible: battery
    spacing: 0

    Text {
        id: content
        text: `${root.percentage}%`
        color: Colors.text
        font: Theme.font
    }

    IconImage {
        source: {
            const charging = root.isCharging ? "charging-" : "";
            const percentage = root.battery.percentage < 1 ? `0${Math.floor(root.battery.percentage * 10) * 10}` : 'full';
            return Quickshell.iconPath(`battery-${percentage}-${charging}symbolic`);
        }
        width: Theme.iconSize
        height: Theme.iconSize
        layer.enabled: true
        layer.effect: MultiEffect {
            colorization: 1.0
            brightness: root.isCharging ? 0.5 : null
            colorizationColor: root.isCharging ? Colors.green : Colors.text
        }
    }
}
