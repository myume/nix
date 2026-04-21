import QtQuick.Effects
import Quickshell
import Quickshell.Widgets
import Quickshell.Services.Pipewire
import qs.common

IconImage {
    id: root

    readonly property PwNode sink: {
        if (Pipewire.ready) {
            return Pipewire.nodes.values.filter(node => {
                return node.name == Pipewire.defaultAudioSink.name && node.properties["media.class"] === "Audio/Sink";
            })[0];
        }
        return null;
    }
    PwObjectTracker {
        objects: Pipewire.nodes.values
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

    layer {
        enabled: true
        effect: MultiEffect {
            colorization: 1.0
            brightness: 0.2
            colorizationColor: Colors.text
        }
    }
}
