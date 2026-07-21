pragma ComponentBehavior: Bound

import QtQuick
import QtQuick.Controls

ListView {
    id: root
    property bool hideOnTimeout: true
    property bool enableSlidein: true

    visible: count > 0
    spacing: 8
    clip: true

    ScrollIndicator.vertical: ScrollIndicator {}

    removeDisplaced: Transition {
        NumberAnimation {
            properties: "y"
            duration: 300
            easing.type: Easing.OutCubic
        }
    }

    delegate: NotificationItem {
        required property var modelData
        notification: modelData
        hideOnTimeout: root.hideOnTimeout
        enabledSlidein: root.enableSlidein
    }
}
