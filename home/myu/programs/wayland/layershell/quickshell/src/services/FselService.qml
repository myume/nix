import Quickshell
import Quickshell.Io
import QtQuick

Item {
    id: root
    property list<var> desktopEntries: []
    property string appName: ""
    property int retries: 3

    function query(searchString: string): list<var> {
        fsel.exec(["fsel", "-r", "--stdout", "--filter-actions", "-ss", searchString]);
    }

    function launch(app: var) {
        appName = app.name;
        retries = 3;
        fselLaunch.running = true;
    }

    function resetEntries() {
        fselInit.running = true;
    }

    Process {
        id: fselLaunch
        command: ["fsel", "-d", "-p", root.appName]
        workingDirectory: Quickshell.env("HOME")
        onExited: (exitCode, exitStatus) => {
            if (exitCode === 1) {
                if (root.retries > 0) {
                    root.retries -= 1;
                    running = true;
                } else {
                    console.error(`Failed to launch ${root.appName}: ${exitCode} ${exitStatus}`);
                }
            }
        }
    }

    Process {
        id: fselInit
        workingDirectory: Quickshell.env("HOME")
        running: true
        command: ["fsel", "-r", "--stdout", "--filter-actions"]
        stdout: StdioCollector {
            onStreamFinished: {
                if (text !== "")
                    root.desktopEntries = JSON.parse(text);
            }
        }
    }

    Process {
        id: fsel
        workingDirectory: Quickshell.env("HOME")
        stdout: StdioCollector {
            onStreamFinished: {
                if (text !== "")
                    root.desktopEntries = JSON.parse(text);
            }
        }
    }
}
