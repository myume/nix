pragma ComponentBehavior: Bound

import QtQuick
import qs.common
import qs.services

Item {
    id: root
    required property string inputText
    onInputTextChanged: {
        rink.query(inputText);
    }

    implicitHeight: text.implicitHeight
    implicitWidth: text.implicitWidth

    RinkService {
        id: rink
    }

    Text {
        id: text
        text: rink.stdout
        font.family: Theme.fontFamily
        font.pixelSize: 18
        color: Colors.text
        anchors.top: parent.top
        padding: 8
        bottomPadding: 16
        topPadding: 0
    }
}
