import QtQuick
import QtQuick.Layouts
import qs.common

Rectangle {
    id: root

    default property alias components: content.data
    property bool enableAnimations: true

    implicitWidth: content.implicitWidth + (content.implicitWidth > 0) * Theme.barHpadding
    implicitHeight: parent.height
    opacity: implicitWidth === 0 ? 0 : 1

    color: Colors.backgroundColor
    radius: Theme.cornerRadius
    clip: true

    Behavior on implicitWidth {
        enabled: root.enableAnimations
        NumberAnimation {
            duration: 250
        }
    }
    Behavior on opacity {
        enabled: root.enableAnimations
        NumberAnimation {
            duration: 250
            onRunningChanged: {
                if (!running && root.opacity === 0) {
                    root.visible = false;
                }
            }
        }
    }

    RowLayout {
        id: content
        anchors.centerIn: parent
    }
}
