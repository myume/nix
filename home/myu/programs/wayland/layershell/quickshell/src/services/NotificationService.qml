pragma ComponentBehavior: Bound
pragma Singleton

import Quickshell
import Quickshell.Services.Notifications
import QtQuick

Singleton {
    id: root

    property list<var> activeNotifications: []
    property list<var> notifications: []
    property var timestamps: ({})
    property bool dnd: false

    function setInactive(id: int) {
        activeNotifications = activeNotifications.filter(notif => notif.id !== id);
    }

    function clear() {
        activeNotifications = [];
        notifications = [];
        timestamps = {};
    }

    function onNewNotification(notif: Notification) {
        notifications = [...root.notifications, notif];
        timestamps[notif.id] = new Date();

        if (!notif.lastGeneration && !dnd)
            activeNotifications = [...root.activeNotifications, notif];
    }

    function onClosed(closed: Notification) {
        root.notifications = root.notifications.filter(notif => notif.id !== closed.id);
        root.activeNotifications = root.activeNotifications.filter(notif => notif.id !== closed.id);
        delete root.timestamps[closed.id];
    }

    NotificationServer {
        actionsSupported: true
        inlineReplySupported: true
        keepOnReload: true
        persistenceSupported: true
        bodySupported: true
        actionIconsSupported: true
        bodyImagesSupported: true
        bodyMarkupSupported: true

        onNotification: notification => {
            notification.tracked = true;
            root.onNewNotification(notification);
        }
    }

    Instantiator {
        model: root.notifications

        Connections {
            required property Notification modelData

            target: modelData

            function onClosed() {
                root.onClosed(modelData);
            }
        }
    }
}
