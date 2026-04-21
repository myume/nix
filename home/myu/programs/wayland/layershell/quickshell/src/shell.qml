//@ pragma IconTheme Papirus-Dark

import QtQuick
import Quickshell
import "modules/bar"

ShellRoot {
    Variants {
        model: Quickshell.screens
        Bar {}
    }
}
