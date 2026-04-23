pragma ComponentBehavior: Bound

import QtQuick
import QtQuick.Layouts
import QtQuick.Controls
import Quickshell
import Quickshell.Widgets
import qs.common

ListView {
    id: root

    property string placeholderText: "Search"
    required property string inputText
    property DesktopEntry selectedEntry: model.values.length > 0 ? model.values[currentIndex] : null
    signal launchedApp(bar: DesktopEntry)

    currentIndex: 0

    onCurrentIndexChanged: {
        root.positionViewAtIndex(root.currentIndex, ListView.Contain);
    }

    function onKeyPressed(event: KeyEvent) {
        if (event.key === Qt.Key_Up || (event.key === Qt.Key_P && event.modifiers & Qt.ControlModifier)) {
            currentIndex = Math.max(0, currentIndex - 1);
            event.accepted = true;
        }
        if (event.key === Qt.Key_Down || (event.key === Qt.Key_N && event.modifiers & Qt.ControlModifier)) {
            currentIndex = Math.min(root.count - 1, currentIndex + 1);
            event.accepted = true;
        }
        if (event.key === Qt.Key_Return) {
            selectedEntry?.execute();
            event.accepted = true;
            launchedApp(selectedEntry);
        }
    }

    ScrollIndicator.vertical: ScrollIndicator {}

    spacing: 4
    model: ScriptModel {
        // TODO: order by similarity + frequency
        values: [...DesktopEntries.applications.values].filter(app => app.name.toLowerCase().startsWith(root.inputText))
    }
    delegate: ItemDelegate {
        id: item
        required property DesktopEntry modelData
        enabled: true
        hoverEnabled: true
        onHoveredChanged: highlighted = hovered

        width: parent?.width ?? 0

        highlighted: item.modelData && item.modelData.name === root.selectedEntry?.name

        padding: 10
        background: Rectangle {
            radius: Theme.cornerRadius
            color: item.highlighted ? Colors.blue : "transparent"
            opacity: 0.2
        }

        onClicked: {
            modelData.execute();
            root.launchedApp(modelData);
        }

        contentItem: RowLayout {
            id: content
            spacing: 12

            IconImage {
                implicitSize: 32
                source: Quickshell.iconPath(item.modelData.icon)
            }
            ColumnLayout {
                Layout.fillWidth: true
                spacing: 2
                Text {
                    Layout.fillWidth: true
                    text: item.modelData.name
                    color: Colors.text
                    font.family: Theme.fontFamily
                    font.weight: 600
                    font.pixelSize: 16
                }
                Text {
                    Layout.fillWidth: true
                    visible: item.modelData.comment !== ""
                    text: item.modelData.comment
                    color: Colors.translucentText
                    font.family: Theme.fontFamily
                    font.weight: 500
                    font.pixelSize: 12
                }
            }
        }
    }
}
