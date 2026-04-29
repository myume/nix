pragma ComponentBehavior: Bound
import QtQuick
import Quickshell
import Quickshell.Wayland
import qs.common
import qs.services

Variants {
    model: Quickshell.screens

    LazyLoader {
        id: loader
        required property ShellScreen modelData
        loading: true
        active: NotificationService.activeNotifications.length > 0

        PanelWindow {
            id: notifications

            WlrLayershell.namespace: "notifications"
            WlrLayershell.layer: WlrLayer.Overlay
            WlrLayershell.exclusionMode: ExclusionMode.Ignore

            screen: loader.modelData

            visible: NotificationService.activeNotifications.length > 0
            color: "transparent"

            margins {
                top: Theme.barHeight + 8
                bottom: 32

                left: 8
                right: 4
            }

            anchors {
                right: true
                top: true
                bottom: true
            }

            implicitWidth: screen.width / 4

            NotificationList {
                anchors.fill: parent
                model: ScriptModel {
                    values: NotificationService.activeNotifications
                    objectProp: "id"
                }
                verticalLayoutDirection: ListView.BottomToTop
            }
        }
    }
}
