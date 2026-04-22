pragma Singleton

import Quickshell
import QtQuick

Singleton {
    readonly property double cornerRadius: 16
    readonly property int iconSize: 14
    readonly property int barHeight: 28

    readonly property QtObject font: QtObject {
        readonly property string family: "Inter"
        readonly property double pixelSize: 12
        readonly property double weight: 600
    }

    readonly property QtObject launcher: QtObject {
        readonly property real aspectRatio: 3/2
    }
}
