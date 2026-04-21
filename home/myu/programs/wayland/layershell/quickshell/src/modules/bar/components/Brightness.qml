import QtQuick
import QtQuick.Effects
import Quickshell
import Quickshell.Widgets
import qs.services
import qs.common

IconImage {
    source: Quickshell.iconPath(BrightnessService.iconName)
    implicitSize: Theme.iconSize

    layer {
        enabled: true
        effect: MultiEffect {
            colorization: 1.0
            brightness: 0.8
            colorizationColor: Colors.text
        }
    }
}
