pragma ComponentBehavior: Bound

import QtQuick
import QtQuick.Layouts
import Quickshell
import Quickshell.Wayland
import qs.common

PopupWindow {
    id: popup
    color: "transparent"
    grabFocus: true

    required property Item item
    property int marginSize: 2
    property int padding: Theme.barHpadding
    default property alias children: content.data

    anchor.window: item.QsWindow.window
    anchor.edges: Edges.Bottom | Edges.Right
    anchor.rect.x: {
        const iconX = item.mapToItem(null, 0, 0).x;
        const screenWidth = item.QsWindow.window?.width ?? 0;
        return Math.min(iconX, screenWidth - implicitWidth - marginSize);
    }
    anchor.rect.y: (item.QsWindow.window?.height ?? 0) + marginSize

    implicitWidth: contentContainer.implicitWidth
    implicitHeight: contentContainer.implicitHeight

    BackgroundEffect.blurRegion: Region {
        item: contentContainer
        radius: Theme.cornerRadius
    }

    Rectangle {
        id: contentContainer
        implicitWidth: content.implicitWidth + popup.padding
        implicitHeight: content.implicitHeight + popup.padding
        radius: Theme.cornerRadius
        color: Colors.backgroundColor
        ColumnLayout {
            id: content
            anchors.centerIn: parent
        }
    }
}
