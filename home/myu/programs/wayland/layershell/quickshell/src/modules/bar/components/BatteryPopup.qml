pragma ComponentBehavior: Bound
import QtQuick
import QtQuick.Layouts
import QtQuick.Controls
import Quickshell
import Quickshell.Services.UPower
import qs.common
import qs.components

Popup {
    id: root
    readonly property UPowerDevice battery: UPower.displayDevice
    readonly property double percentage: Math.round(battery.percentage * 100)
    readonly property bool isCharging: battery.state === UPowerDeviceState.Charging

    padding: Theme.barHpadding + 8

    function secondsToHMS(totalSeconds: real): string {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;

        let duration = "";
        if (h > 0) {
            duration += `${h}h `;
        }
        if (m > 0) {
            duration += `${m}m `;
        }
        if (s >= 0) {
            duration += `${s}s `;
        }
        return duration.trim();
    }

    ColumnLayout {
        spacing: 12
        RowLayout {
            BatteryIcon {
                implicitSize: Theme.iconSize + 54
            }

            ColumnLayout {
                spacing: 0
                Text {
                    text: `${root.percentage}%`
                    color: Colors.text
                    font.family: Theme.fontFamily
                    font.pixelSize: Theme.font.pixelSize * 2
                    font.bold: true
                }
                Text {
                    text: UPowerDeviceState.toString(root.battery.state)
                    color: Colors.text
                    font.family: Theme.fontFamily
                    font.pixelSize: Theme.font.pixelSize + 1
                    font.weight: 600
                }
                Text {
                    readonly property real time: root.isCharging ? root.battery.timeToFull : root.battery.timeToEmpty
                    visible: time > 0
                    text: root.secondsToHMS(time)
                    color: Colors.text
                    font.family: Theme.fontFamily
                    font.pixelSize: Theme.font.pixelSize
                }
            }
        }

        Rectangle {
            Layout.fillWidth: true
            implicitHeight: 2
            radius: Theme.cornerRadius
            color: Colors.overlay
            opacity: 0.4
        }

        RowLayout {
            spacing: 12
            Repeater {
                model: [PowerProfile.PowerSaver, PowerProfile.Balanced, PowerProfile.Performance]
                delegate: RoundButton {
                    id: powerProfileItem
                    Layout.fillWidth: true
                    required property var modelData
                    readonly property string profile: {
                        let profile = PowerProfile.toString(powerProfileItem.modelData).toLowerCase();
                        if (PowerProfile.PowerSaver === powerProfileItem.modelData) {
                            profile = "power-saver";
                        }
                        return profile;
                    }

                    MouseArea {
                        anchors.fill: parent
                        onClicked: PowerProfiles.profile = powerProfileItem.modelData
                    }

                    hoverEnabled: true
                    highlighted: hovered
                    background: Rectangle {
                        radius: Theme.cornerRadius / 2
                        color: powerProfileItem.highlighted ? Colors.lavender : "transparent"
                        opacity: 0.2
                        Behavior on color {
                            ColorAnimation {
                                duration: 100
                            }
                        }
                    }
                    icon {
                        color: powerProfileItem.modelData === PowerProfiles.profile ? Colors.blue : Colors.text
                        source: {
                            return Quickshell.iconPath(`power-profile-${powerProfileItem.profile}-symbolic`);
                        }
                        Behavior on color {
                            ColorAnimation {
                                duration: 200
                            }
                        }
                    }
                }
            }
        }
        Text {
            Layout.fillWidth: true
            text: PowerProfile.toString(PowerProfiles.profile)
            horizontalAlignment: Text.AlignHCenter
            color: Colors.text
            font: Theme.font
        }
    }
}
