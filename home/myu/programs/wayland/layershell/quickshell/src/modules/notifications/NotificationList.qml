pragma ComponentBehavior: Bound

import QtQuick

ListView {
    id: root
    property bool hideOnTimeout: true
    property bool enableSlidein: true

    visible: count > 0
    spacing: 8

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
