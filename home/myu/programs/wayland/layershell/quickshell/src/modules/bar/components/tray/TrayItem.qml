pragma ComponentBehavior: Bound

import QtQuick
import Quickshell.Services.SystemTray
import Quickshell.Widgets
import qs.common

MouseArea {
    id: root
    required property SystemTrayItem modelData
    property bool menuActive: false

    hoverEnabled: true
    implicitWidth: icon.implicitWidth
    implicitHeight: icon.implicitHeight
    acceptedButtons: Qt.LeftButton | Qt.RightButton

    IconImage {
        id: icon
        source: root.modelData.icon
        implicitSize: Theme.iconSize + 2
    }

    Loader {
        active: root.modelData.hasMenu && root.modelData.menu && root.menuActive
        sourceComponent: TrayMenu {
            id: menu
            menu: root.modelData.menu
            pos: root.mapToGlobal(0, 0)
            onMenuOpenChanged: {
                console.log('open', menuOpen);
                if (!menuOpen)
                    root.menuActive = false;
            }
        }
    }

    onClicked: event => {
        switch (event.button) {
        case Qt.LeftButton:
            modelData.activate();
            break;
        case Qt.RightButton:
            if (modelData.hasMenu) {
                menuActive = !menuActive;
            }
            break;
        }
        event.accepted = true;
    }
}
