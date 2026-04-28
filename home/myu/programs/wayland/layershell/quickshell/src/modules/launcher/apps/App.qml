pragma ComponentBehavior: Bound

import QtQuick
import QtQuick.Layouts
import QtQuick.Controls
import Quickshell
import Quickshell.Widgets
import qs.common
import qs.services

ListView {
    id: root

    FselService {
        id: fsel
    }

    property string placeholderText: "Search"
    required property string inputText
    readonly property var selectedEntry: model.values.length > 0 ? model.values[currentIndex] ?? null : null
    signal launchedApp(app: var)

    currentIndex: 0
    onCurrentIndexChanged: {
        root.positionViewAtIndex(root.currentIndex, ListView.Contain);
    }

    onInputTextChanged: {
        fsel.query(root.inputText);
    }

    function fselLaunch(app) {
        fsel.launch(app);
        fsel.resetEntries();
        root.launchedApp(app);
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
        if (event.key === Qt.Key_Return && selectedEntry) {
            fselLaunch(selectedEntry);
            event.accepted = true;
        }
    }

    ScrollIndicator.vertical: ScrollIndicator {}

    spacing: 4
    model: ScriptModel {
        values: fsel.desktopEntries
        objectProp: "desktop_id"
        onValuesChanged: {
            root.currentIndex = 0;
        }
    }
    delegate: ItemDelegate {
        id: item
        required property var modelData
        enabled: true
        hoverEnabled: true
        onHoveredChanged: {
            if (hovered) {
                root.currentIndex = root.model.values.findIndex(app => app.desktop_id === modelData.desktop_id);
            }
        }

        width: parent?.width ?? 0

        highlighted: ListView.isCurrentItem

        padding: 10
        background: Rectangle {
            radius: Theme.cornerRadius
            color: item.highlighted ? Colors.blue : "transparent"
            opacity: 0.2
        }

        onClicked: root.fselLaunch(modelData)

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
                    visible: item.modelData.description !== ""
                    text: item.modelData.description
                    color: Colors.translucentText
                    font.family: Theme.fontFamily
                    font.weight: 500
                    font.pixelSize: 12
                }
            }
        }
    }
}
