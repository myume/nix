pragma ComponentBehavior: Bound

import QtQuick
import QtQuick.Layouts
import QtQuick.Controls
import QtQuick.Effects
import Quickshell
import Quickshell.Widgets
import Quickshell.Services.Notifications
import qs.common
import qs.services

ItemDelegate {
    id: root

    required property Notification notification

    hoverEnabled: true
    onHoveredChanged: {
        if (hovered) {
            expireTimer.stop();
        } else {
            expireTimer.restart();
        }
    }

    implicitWidth: parent?.width ?? 0

    Timer {
        id: expireTimer
        running: true
        interval: Math.max(root.notification.expireTimeout, 3000)
        onTriggered: {
            if (root.notification.expireTimeout > 0) {
                root.notification.expire();
            } else {
                NotificationService.setInactive(root.notification.id);
            }
        }
    }

    background: Rectangle {
        color: Colors.base
        radius: Theme.cornerRadius
        border.color: Colors.translucentBlue
        border.width: 2
    }

    contentItem: ColumnLayout {
        ColumnLayout {
            Layout.margins: 12
            Layout.topMargin: 8

            spacing: 8

            RowLayout {
                id: status
                spacing: 8

                Layout.fillWidth: true

                RowLayout {
                    IconImage {
                        visible: root.notification.appIcon !== ""
                        implicitSize: Theme.iconSize + 4
                        source: Quickshell.iconPath(root.notification.appIcon)
                    }
                    Text {
                        Layout.fillWidth: true
                        text: {
                            let appName = "Unknown";
                            if (root.notification.appName !== "") {
                                appName = root.notification.appName;
                                appName[0] = appName[0].toUpperCase();
                            }
                            return appName;
                        }
                        color: Colors.text
                        font.family: Theme.fontFamily
                        font.pixelSize: 12
                        font.weight: 600
                    }
                }

                Text {
                    text: NotificationService.timestamps[root.notification.id].toLocaleString({
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: false
                    })
                    color: Colors.text
                    font.family: Theme.fontFamily
                    font.weight: 600
                }

                Rectangle {
                    id: closeBg
                    color: "transparent"

                    implicitWidth: closeIcon.implicitWidth
                    implicitHeight: closeIcon.implicitHeight

                    radius: implicitWidth

                    IconImage {
                        id: closeIcon
                        implicitSize: Theme.iconSize + 4

                        source: Quickshell.iconPath("window-close-symbolic")
                        layer {
                            enabled: true
                            effect: MultiEffect {
                                colorization: 1.0
                                brightness: 0.8
                                colorizationColor: Colors.red
                            }
                        }
                    }

                    MouseArea {
                        id: closeArea
                        anchors.fill: parent
                        hoverEnabled: true

                        onExited: closeBg.color = "transparent"
                        onEntered: closeBg.color = Colors.translucentBlue

                        onClicked: {
                            root.notification.dismiss();
                        }
                    }
                }
            }

            RowLayout {
                Layout.fillWidth: true
                Layout.fillHeight: true

                spacing: 16

                IconImage {
                    Layout.alignment: Qt.AlignVCenter
                    implicitSize: 72
                    visible: !!root.notification.image
                    source: root.notification.image
                }
                ColumnLayout {
                    Layout.alignment: Qt.AlignVCenter

                    Text {
                        Layout.fillWidth: true
                        text: root.notification.summary
                        color: Colors.text
                        font.family: Theme.fontFamily
                        font.pixelSize: 18
                        font.bold: true
                        wrapMode: Text.Wrap
                        elide: Text.ElideRight
                        maximumLineCount: 1
                    }
                    Text {
                        Layout.fillHeight: true
                        Layout.fillWidth: true
                        text: root.notification.body
                        color: Colors.text
                        font.family: Theme.fontFamily
                        font.weight: 500
                        wrapMode: Text.Wrap
                        elide: Text.ElideRight
                        maximumLineCount: 3
                    }
                }
            }
        }
    }
}
