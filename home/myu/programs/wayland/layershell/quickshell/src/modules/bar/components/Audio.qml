import QtQuick.Effects
import Quickshell
import Quickshell.Widgets
import qs.common
import qs.services

IconImage {
    id: root

    implicitSize: Theme.iconSize
    source: Quickshell.iconPath(AudioService.iconName)

    layer {
        enabled: true
        effect: MultiEffect {
            colorization: 1.0
            brightness: 0.2
            colorizationColor: Colors.text
        }
    }
}
