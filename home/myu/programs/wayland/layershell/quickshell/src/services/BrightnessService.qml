pragma Singleton

import QtQuick
import Quickshell
import Quickshell.Io

Singleton {
    id: root
    property string device: ""
    property string deviceType: ""
    property int currentBrightness: device !== "" ? Number(brightness.text()) : 0
    property int maxBrightness: 0
    property real percentage: maxBrightness > 0 ? currentBrightness / maxBrightness : 0
    readonly property string iconName: {
        let icon = percentage >= 0.8 ? "high" : percentage >= 0.4 ? "medium" : "low";
        return `brightness-${icon}-symbolic`;
    }

    function updateBrightness(brightness: real) {
        updateBrightessProc.exec(["brightnessctl", "set", `${Math.round(brightness * 100)}%`]);
    }

    Process {
        id: updateBrightessProc
    }

    FileView {
        id: brightness
        path: root.device !== "" ? Qt.resolvedUrl(`/sys/class/backlight/${root.device}/brightness`) : ""
        blockLoading: true
        watchChanges: true
        onFileChanged: this.reload()
    }

    Process {
        id: brightnessProc
        command: ["brightnessctl", "-m"]
        running: true
        stdout: StdioCollector {
            onStreamFinished: {
                const [device, clss, curr, percentage, max] = data.toString().split(',');
                root.device = device;
                root.deviceType = clss;
                root.maxBrightness = Number(max);
            }
        }
    }
}
