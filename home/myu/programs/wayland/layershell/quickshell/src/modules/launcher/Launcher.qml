pragma ComponentBehavior: Bound
import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import Quickshell
import Quickshell.Io
import Quickshell.Wayland
import qs.common
import "apps"

PanelWindow {
    id: launcher
    WlrLayershell.namespace: "launcher"
    WlrLayershell.layer: WlrLayer.Overlay
    exclusionMode: ExclusionMode.Ignore

    focusable: true

    property bool active: false
    visible: false
    color: 'transparent'

    implicitWidth: content.implicitWidth
    implicitHeight: content.implicitHeight

    function show() {
        visible = true;
        active = true;
    }

    function hide() {
        active = false;
        if (appSelector.item?.currentIndex)
            appSelector.item.currentIndex = 0;
        search.text = "";
        appSelector.appIndex = 0;
    }

    BackgroundEffect.blurRegion: Region {
        item: content
        radius: Theme.cornerRadius
        y: content.yOffset
    }

    Rectangle {
        id: content
        color: Colors.backgroundColor
        radius: Theme.cornerRadius
        implicitWidth: 800
        implicitHeight: layout.implicitHeight

        ColumnLayout {
            id: layout
            anchors.fill: parent
            anchors.margins: 16
            spacing: 16

            TextField {
                id: search
                Layout.fillWidth: true
                enabled: launcher.visible
                focus: launcher.visible

                font.family: Theme.fontFamily
                font.weight: 500
                font.pixelSize: 16
                color: Colors.text
                placeholderText: `${appSelector.item?.placeholderText ?? "Start typing"}...`
                placeholderTextColor: Colors.translucentText

                padding: 14

                background: Rectangle {
                    radius: Theme.cornerRadius
                    color: Colors.lavender
                    opacity: 0.2
                }

                Keys.onEscapePressed: {
                    launcher.hide();
                }
                Keys.onTabPressed: {
                    appSelector.appIndex = (appSelector.appIndex + 1) % appSelector.apps.length;
                }
                Keys.onPressed: event => {
                    appSelector.item?.onKeyPressed(event);
                }

                onActiveFocusChanged: {
                    if (!activeFocus) {
                        launcher.hide();
                    }
                }
            }

            Loader {
                id: appSelector
                Layout.fillWidth: true
                active: true

                property int appIndex: 0
                readonly property list<Component> apps: [app, rink]
                readonly property Component app: App {
                    implicitHeight: content.implicitWidth / Theme.launcherAspectRatio - search.implicitHeight
                    inputText: search.text
                    onLaunchedApp: {
                        launcher.hide();
                    }
                }
                readonly property Component rink: Rink {
                    id: rink
                    inputText: search.text
                }

                sourceComponent: apps[appIndex]
            }
        }

        property real yOffset: launcher.active ? 0 : implicitHeight + 1
        opacity: launcher.active ? 1 : 0
        transform: Translate {
            y: content.yOffset
        }

        Behavior on opacity {
            NumberAnimation {
                duration: 300
            }
        }

        Behavior on yOffset {
            SpringAnimation {
                spring: 10
                damping: 0.6
                epsilon: 0.25
                onRunningChanged: {
                    if (!running && !launcher.active)
                        launcher.visible = false;
                }
            }
        }

        Behavior on implicitHeight {
            SpringAnimation {
                spring: 20
                damping: 0.7
                epsilon: 0.25
            }
        }
    }

    IpcHandler {
        target: "launcher"

        function toggle() {
            if (launcher.visible)
                launcher.hide();
            else
                launcher.show();
        }
    }
}
