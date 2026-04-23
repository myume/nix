pragma Singleton

import Quickshell
import QtQuick

Singleton {
    readonly property string time: {
        Qt.formatDateTime(clock.date, "ddd MMM d hh:mm");
    }

    SystemClock {
        id: clock
        precision: SystemClock.Seconds
    }
}
