pragma ComponentBehavior: Bound
import QtQuick
import QtQuick.Layouts
import Quickshell
import Quickshell.Wayland
import qs.common

PanelWindow {
    id: root
    color: "transparent"
    focusable: true
    implicitWidth: contentContainer.implicitWidth
    implicitHeight: contentContainer.implicitHeight

    required property Item item
    property int padding: 18
    property bool isOpen: false
    property bool isActive: false
    property int margin: 8

    default property alias children: content.data
    property alias activeFocus: contentContainer.activeFocus

    WlrLayershell.namespace: "popup"
    WlrLayershell.exclusionMode: ExclusionMode.Ignore

    margins {
        top: {
            return item.mapToGlobal(0, 0).y + item.implicitHeight + root.margin + 6;
        }
        left: {
            const maxOffset = screen.width - implicitWidth - root.margin;
            const minOffset = root.margin;
            return Math.min(Math.max(item.mapToGlobal(0, 0).x, minOffset), maxOffset);
        }
    }

    anchors.top: item.bottom
    anchors.left: item.left

    BackgroundEffect.blurRegion: Region {
        item: contentContainer
        radius: Theme.cornerRadius
        y: contentContainer.slideOffset
    }

    Rectangle {
        id: contentContainer
        focus: root.isOpen
        implicitWidth: content.implicitWidth + root.padding
        implicitHeight: content.implicitHeight + root.padding
        radius: Theme.cornerRadius
        color: Colors.backgroundColor
        opacity: !root.isActive ? 0 : 1
        border.color: Colors.translucentBase
        border.width: 2

        Keys.onEscapePressed: {
            root.isActive = false;
        }

        property int slideOffset: root.isActive ? 0 : -implicitHeight

        transform: Translate {
            y: contentContainer.slideOffset
        }

        Component.onCompleted: {
            root.isOpen = true;
            root.isActive = true;
        }

        onActiveFocusChanged: {
            if (!activeFocus)
                root.isActive = false;
        }

        Behavior on opacity {
            NumberAnimation {
                duration: 200
            }
        }

        Behavior on slideOffset {
            SpringAnimation {
                id: slidein
                spring: 6
                damping: 0.6
                epsilon: 0.25
                onRunningChanged: {
                    if (!running && !root.isActive) {
                        root.isOpen = false;
                    }
                }
            }
        }

        ColumnLayout {
            id: content
            anchors.centerIn: parent
        }
    }
}
