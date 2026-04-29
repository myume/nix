pragma ComponentBehavior: Bound

import QtQuick
import Quickshell
import Quickshell.Widgets
import qs.common
import qs.services

MouseArea {
    id: root
    implicitWidth: icon.implicitWidth
    implicitHeight: icon.implicitHeight

    IconImage {
        id: icon
        implicitSize: Theme.iconSize
        source: {
            let icon = NotificationService.notifications.length > 0 ? "notification-active-symbolic" : "notification-inactive-symbolic";
            if (NotificationService.dnd) {
                icon = "notification-disabled-symbolic";
            }
            return Quickshell.iconPath(icon);
        }
    }

    onClicked: {
        popupLoader.active = !popupLoader.active;
    }

    Loader {
        id: popupLoader
        active: false
        sourceComponent: NotificationPopup {
            item: icon
            onIsOpenChanged: {
                if (!isOpen)
                    popupLoader.active = false;
            }
        }
    }
}
