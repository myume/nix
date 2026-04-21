pragma Singleton

import QtQuick
import Quickshell
import Quickshell.Io

Singleton {
    id: root
    property string device: ""
    property string deviceType: ""
    property int currentBrightness: 0
    property int maxBrightness: 0
    property real percentage: maxBrightness > 0 ? currentBrightness / maxBrightness : 0
    readonly property string iconName: {
        let icon = percentage >= 0.8 ? "high" : percentage >= 0.4 ? "medium" : "low";
        return `brightness-${icon}-symbolic`;
    }

    FileView {
        path: Qt.resolvedUrl(`/sys/class/backlight/${root.device}/brightness`)
        watchChanges: true
        onFileChanged: {
            this.reload();
            root.currentBrightness = this.text();
        }
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
                root.currentBrightness = curr;
                root.maxBrightness = max;
            }
        }
    }
}
