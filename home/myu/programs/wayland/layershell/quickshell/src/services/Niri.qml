pragma Singleton

import Quickshell
import Quickshell.Io
import QtQuick

Singleton {
    id: niri

    property list<var> workspaces: []

    function focusWorkspace(i) {
        niriDispatcher.exec(["niri", "msg", "action", "focus-workspace", i]);
    }

    Process {
        id: niriDispatcher
    }

    Process {
        command: ["niri", "msg", "-j", "event-stream"]
        running: true

        stdout: SplitParser {
            onRead: data => {
                const event = JSON.parse(data);
                const eventType = Object.keys(event)[0];
                if (eventType.startsWith("Workspace")) {
                    workspaceEvents.running = true;
                }
            }
        }
    }

    Process {
        id: workspaceEvents
        command: ["niri", "msg", "-j", "workspaces"]
        running: true

        stdout: StdioCollector {
            onStreamFinished: {
                niri.workspaces = JSON.parse(data).sort((a, b) => a.idx - b.idx);
            }
        }
    }
}
