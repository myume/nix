pragma ComponentBehavior: Bound
import QtQuick
import QtQuick.Layouts
import QtQuick.Controls
import qs.common

ColumnLayout {
    id: root
    Layout.minimumWidth: 240

    property date instant: new Date()

    RowLayout {
        Layout.alignment: Qt.AlignHCenter
        Text {
            text: " "
            font.pixelSize: 20
            font.bold: true
            font.family: Theme.fontFamily
            color: Colors.text
            MouseArea {
                anchors.fill: parent
                onClicked: {
                    let newDate = new Date(root.instant);
                    newDate.setMonth(root.instant.getMonth() - 1);
                    root.instant = newDate;
                }
            }
        }
        ColumnLayout {
            spacing: 0
            Text {
                Layout.fillWidth: true
                horizontalAlignment: Qt.AlignHCenter
                verticalAlignment: Qt.AlignVCenter
                text: monthGrid.locale.toString(root.instant, "yyyy")
                font.bold: true
                font.family: Theme.fontFamily
                color: Colors.text
                opacity: 0.7
            }
            Text {
                Layout.fillWidth: true
                horizontalAlignment: Qt.AlignHCenter
                verticalAlignment: Qt.AlignVCenter
                text: monthGrid.locale.toString(root.instant, "MMMM")
                font.pixelSize: 20
                font.bold: true
                font.family: Theme.fontFamily
                color: Colors.text
            }
        }
        Text {
            text: " "
            font.pixelSize: 20
            font.bold: true
            font.family: Theme.fontFamily
            color: Colors.text
            MouseArea {
                anchors.fill: parent
                onClicked: {
                    let newDate = new Date(root.instant);
                    newDate.setMonth(root.instant.getMonth() + 1);
                    root.instant = newDate;
                }
            }
        }
    }

    DayOfWeekRow {
        Layout.fillWidth: true
        locale: monthGrid.locale

        delegate: Text {
            horizontalAlignment: Qt.AlignHCenter
            verticalAlignment: Qt.AlignVCenter
            text: shortName
            font.family: Theme.fontFamily
            font.bold: true
            color: Colors.text

            required property string shortName
        }
    }

    MonthGrid {
        id: monthGrid
        locale: Qt.locale("en_US")
        month: root.instant.getMonth()
        year: root.instant.getFullYear()

        Layout.fillWidth: true
        Layout.fillHeight: true

        delegate: Text {
            id: monthItem
            readonly property bool isSelected: model.day === root.instant.getDate() && model.month === root.instant.getMonth()
            horizontalAlignment: Text.AlignHCenter
            verticalAlignment: Text.AlignVCenter
            opacity: model.month === monthGrid.month ? 1 : 0.3
            text: monthGrid.locale.toString(model.date, "d")
            color: isSelected ? Colors.blue : Colors.text
            font.family: Theme.fontFamily
            font.weight: isSelected ? 800 : 600

            required property var model

            MouseArea {
                anchors.fill: parent
                onClicked: {
                    let newDate = new Date(root.instant);
                    newDate.setMonth(monthItem.model.month);
                    newDate.setDate(monthItem.model.day);
                    root.instant = newDate;
                }
            }

            Rectangle {
                anchors.fill: parent
                color: Colors.blue
                radius: Theme.cornerRadius
                opacity: 0.2
                visible: monthItem.isSelected
                z: -1
            }
        }
    }
}
