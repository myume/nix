pragma Singleton

import Quickshell
import QtQuick

Singleton {
    readonly property double cornerRadius: 16
    readonly property string backgroundColor: "#b01e1e2e"
    readonly property QtObject font: QtObject {
        readonly property string family: "Inter"
        readonly property double pixelSize: 11
        readonly property double weight: 600
    }
}
