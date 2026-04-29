import Quickshell
import Quickshell.Io
import QtQuick

Item {
    id: root
    property list<var> desktopEntries: []

    function query(searchString: string): list<var> {
        fsel.exec(["fsel", "-r", "--stdout", "--filter-actions", "-ss", searchString]);
    }

    function launch(app: var) {
        fselLaunch.exec(["fsel", "-r", "-d", "-p", app.name]);
    }

    function resetEntries() {
        fselInit.running = true;
    }

    Process {
        id: fselLaunch
        workingDirectory: Quickshell.env("HOME")
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
