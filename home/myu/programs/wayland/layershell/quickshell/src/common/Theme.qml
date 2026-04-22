pragma Singleton

import Quickshell
import QtQuick

Singleton {
    id: root

    readonly property double cornerRadius: 16
    readonly property int iconSize: 14
    readonly property int barHeight: 28

    readonly property string fontFamily: "Inter"
    readonly property QtObject font: QtObject {
        readonly property string family: root.fontFamily
        readonly property double pixelSize: 12
        readonly property double weight: 600
    }

    readonly property real launcherAspectRatio: 3 / 2
}
