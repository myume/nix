pragma ComponentBehavior: Bound

import QtQuick
import QtQuick.Effects
import QtQuick.Layouts
import QtQuick.Controls
import Quickshell
import Quickshell.Widgets
import qs.components
import qs.services
import qs.modules.notifications
import qs.common

Popup {
    id: root

    padding: 32

    ColumnLayout {
        spacing: 16
        Layout.preferredWidth: root.screen.width / 4
        Layout.preferredHeight: root.screen.height / 2

        RowLayout {
            Text {
                Layout.fillWidth: true
                text: "Notifications"
                font.family: Theme.fontFamily
                font.bold: true
                font.pixelSize: 18
                color: Colors.text
            }

            Rectangle {
                id: dndButton
                implicitHeight: dndContent.implicitHeight + 6
                implicitWidth: dndContent.implicitWidth + Theme.barHpadding - 4
                radius: Theme.cornerRadius
                color: NotificationService.dnd ? Colors.blue : Colors.translucentBlue

                Behavior on color {
                    ColorAnimation {
                        duration: 100
                    }
                }

                RowLayout {
                    id: dndContent
                    anchors.centerIn: parent
                    Text {
                        text: "DND"
                        color: NotificationService.dnd ? Colors.bgColor : Colors.text
                        font.family: Theme.fontFamily
                        font.bold: true
                        Behavior on color {
                            ColorAnimation {
                                duration: 100
                            }
                        }
                    }
                    IconImage {
                        implicitSize: Theme.iconSize
                        source: Quickshell.iconPath("night-light-symbolic")
                        layer {
                            enabled: true
                            effect: MultiEffect {
                                colorization: 1.0
                                brightness: 0.7
                                colorizationColor: NotificationService.dnd ? Colors.bgColor : Colors.text
                                Behavior on colorizationColor {
                                    ColorAnimation {
                                        duration: 100
                                    }
                                }
                            }
                        }
                    }
                }

                MouseArea {
                    anchors.fill: parent
                    hoverEnabled: true

                    onClicked: NotificationService.dnd = !NotificationService.dnd

                    onEntered: {
                        dndButton.color = NotificationService.dnd ? Colors.translucentBlue : Colors.blue;
                    }

                    onExited: {
                        dndButton.color = NotificationService.dnd ? Colors.blue : Colors.translucentBlue;
                    }
                }
            }
        }

        Text {
            Layout.fillWidth: true
            Layout.fillHeight: true
            horizontalAlignment: Text.AlignHCenter
            verticalAlignment: Text.AlignVCenter
            visible: notifs.count === 0
            text: "No Notifications"
            font.family: Theme.fontFamily
            font.pixelSize: 18
            color: Colors.text
        }

        NotificationList {
            id: notifs
            Layout.fillHeight: true
            Layout.fillWidth: true

            hideOnTimeout: false
            enableSlidein: false

            model: ScriptModel {
                values: NotificationService.notifications
                objectProp: "id"
            }
        }

        Rectangle {
            id: clearButton
            visible: notifs.count > 0
            implicitHeight: dndContent.implicitHeight + 4
            implicitWidth: dndContent.implicitWidth + Theme.barHpadding
            radius: Theme.cornerRadius
            color: Colors.translucentBlue
            Behavior on color {
                ColorAnimation {
                    duration: 100
                }
            }

            RowLayout {
                anchors.centerIn: parent
                Text {
                    text: "Clear"
                    color: Colors.text
                    font: Theme.font
                }
                IconImage {
                    implicitSize: Theme.iconSize
                    source: Quickshell.iconPath("edit-clear-all-symbolic")
                    layer {
                        enabled: true
                        effect: MultiEffect {
                            colorization: 1.0
                            brightness: 0.8
                            colorizationColor: Colors.text
                        }
                    }
                }
            }

            MouseArea {
                id: clearButtonArea
                anchors.fill: parent
                onClicked: NotificationService.clear()
                hoverEnabled: true
                onEntered: {
                    clearButton.color = Colors.blue;
                }
                onExited: {
                    clearButton.color = Colors.translucentBlue;
                }
            }
        }
    }
}
