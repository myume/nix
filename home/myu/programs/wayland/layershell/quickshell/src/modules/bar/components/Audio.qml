import Quickshell
import Quickshell.Widgets
import Quickshell.Services.Pipewire
import qs.common

IconImage {
    id: root

    readonly property PwNode sink: Pipewire.defaultAudioSink
    PwObjectTracker {
        objects: [root.sink]
    }

    readonly property string volumeLevel: {
        if (!sink || sink.audio.muted)
            return "muted";
        if (sink.audio.volume >= 0.66)
            return "high";
        if (sink.audio.volume >= 0.33)
            return "medium";
        return "low";
    }

    implicitSize: Theme.iconSize
    source: Quickshell.iconPath(`audio-volume-${volumeLevel}-symbolic`)
}
