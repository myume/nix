pragma Singleton

import Quickshell
import Quickshell.Services.Pipewire

Singleton {
    id: root

    readonly property PwNode defaultAudioSink: {
        if (Pipewire.ready) {
            return Pipewire.nodes.values.filter(node => {
                return node.name === Pipewire.defaultAudioSink?.name && node.properties["media.class"] === "Audio/Sink";
            })[0];
        }
        return null;
    }

    PwObjectTracker {
        objects: Pipewire.nodes.values
    }

    readonly property string iconName: {
        let volumeLevel = "low";
        if (!root.defaultAudioSink || root.defaultAudioSink.audio.muted)
            volumeLevel = "muted";
        else if (root.defaultAudioSink.audio.volume >= 0.66)
            volumeLevel = "high";
        else if (root.defaultAudioSink.audio.volume >= 0.33)
            volumeLevel = "medium";
        return `audio-volume-${volumeLevel}-symbolic`;
    }
}
