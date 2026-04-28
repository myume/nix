pragma ComponentBehavior: Bound
import QtQuick
import qs.common
import qs.components

MouseArea {
    implicitWidth: time.implicitWidth
    implicitHeight: time.implicitHeight

    Text {
        id: time
        text: Time.time
        color: Colors.text
        font: Theme.font
    }

    onClicked: {
        popupLoader.active = !popupLoader.active;
    }

    Loader {
        id: popupLoader
        active: false
        sourceComponent: Popup {
            padding: 40
            item: time
            anchors.left: false
            onIsOpenChanged: {
                if (!isOpen)
                    popupLoader.active = false;
            }
            Calendar {}
        }
    }
}
