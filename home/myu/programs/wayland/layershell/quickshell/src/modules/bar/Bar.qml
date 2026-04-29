pragma ComponentBehavior: Bound
import QtQuick
import QtQuick.Layouts
import Quickshell
import Quickshell.Wayland
import qs.common
import "components"
import "components/tray"

Variants {
    model: Quickshell.screens
    PanelWindow {
        id: bar
        WlrLayershell.namespace: "bar"

        required property ShellScreen modelData
        screen: modelData

        color: "transparent"
        implicitHeight: Theme.barHeight

        margins {
            top: 4
            left: 10
            right: 10
        }

        anchors {
            top: true
            left: true
            right: true
        }

        BackgroundEffect.blurRegion: Region {
            Region {
                item: workspaces
                radius: Theme.cornerRadius
            }
            Region {
                item: mprisSection.visible ? mprisSection : null
                radius: Theme.cornerRadius
            }
            Region {
                item: clock
                radius: Theme.cornerRadius
            }
            Region {
                item: right
                radius: Theme.cornerRadius
            }
        }

        RowLayout {
            id: left
            implicitHeight: Theme.barHeight
            anchors.left: parent.left

            Section {
                id: workspaces
                Workspaces {
                    screen: bar.screen
                }
            }
            Section {
                id: mprisSection
                Mpris {
                    id: mpris
                    onActiveChanged: {
                        if (active)
                            mprisSection.visible = active;
                    }
                }
            }
        }

        RowLayout {
            id: center
            implicitHeight: Theme.barHeight
            anchors.centerIn: parent

            Section {
                id: clock
                Clock {}
            }
        }

        RowLayout {
            implicitHeight: Theme.barHeight
            anchors.right: parent.right

            Section {
                id: right

                Tray {}
                Network {}
                Brightness {}
                Audio {}
                Battery {}
                Notifications {}
            }
        }
    }
}
