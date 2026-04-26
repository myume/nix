pragma ComponentBehavior: Bound
import QtQuick
import QtQuick.Effects
import QtQuick.Layouts
import Quickshell
import Quickshell.Widgets
import Quickshell.Services.Pipewire
import qs.common
import qs.services

RowLayout {
    id: root

    required property PwNode node
    property string iconName: node ? AudioService.iconLookup(node) : ""
    property string name: node?.nickname || node?.description || node?.name || "Unknown"

    IconImage {
        implicitSize: Theme.iconSize
        source: Quickshell.iconPath(root.iconName)
        layer {
            enabled: root.iconName.endsWith("symbolic")
            effect: MultiEffect {
                colorization: 1.0
                brightness: 0.4
                colorizationColor: Colors.text
            }
        }
    }
    Text {
        Layout.preferredWidth: 240
        text: root.name
        elide: Text.ElideRight
        font: Theme.font
        color: Colors.text
    }
}
