//@ pragma IconTheme Papirus-Dark

import QtQuick
import Quickshell
import qs.modules.bar
import qs.modules.launcher

ShellRoot {
    Variants {
        model: Quickshell.screens
        Bar {}
    }
    Variants {
        model: Quickshell.screens
        Launcher {}
    }
}
