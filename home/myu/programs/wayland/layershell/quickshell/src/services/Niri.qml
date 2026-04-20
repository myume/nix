pragma Singleton

import Quickshell
import Quickshell.Io
import QtQuick

Singleton {
    id: niri

    property var workspaces: []

    Process {
        command: ["niri", "msg", "-j", "event-stream"]
        running: true

        stdout: SplitParser {
            onRead: data => {
                const event = JSON.parse(data);
                const eventType = Object.keys(event)[0];
                if (eventType.startsWith("Workspace")) {
                    workspaceProcess.running = true
                }
            }
        }
    }

    Process {
        id: workspaceProcess
        command: ["niri", "msg", "-j", "workspaces"]
        running: true

        stdout: StdioCollector {
            onStreamFinished: {
                niri.workspaces = JSON.parse(data);
            }
        }
    }
}
