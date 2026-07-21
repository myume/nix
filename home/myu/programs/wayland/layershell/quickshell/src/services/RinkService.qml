import Quickshell.Io
import QtQuick

Item {
    id: root

    property string stdout: ""

    function query(expr: string) {
        if (expr === "") {
            stdout = "";
        } else {
            rink.exec(["rink", expr]);
        }
    }

    Process {
        id: rink
        running: false
        environment: ({
                NO_COLOR: "true"
            })
        stdout: StdioCollector {
            onStreamFinished: {
                if (text !== "")
                    root.stdout = text;
            }
        }
    }
}
