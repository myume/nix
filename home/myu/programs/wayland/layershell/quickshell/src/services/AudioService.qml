pragma Singleton

import Quickshell
import Quickshell.Services.Pipewire

Singleton {
    id: root

    readonly property PwNode defaultAudioSink: {
        if (Pipewire.ready) {
            return Pipewire.nodes.values.filter(node => {
                return node.name === Pipewire.defaultAudioSink?.name && node.type === PwNodeType.AudioSink;
            })[0] ?? null;
        }
        return null;
    }

    readonly property PwNodeLinkTracker linkTracker: PwNodeLinkTracker {
        node: root.defaultAudioSink
    }

    PwObjectTracker {
        objects: Pipewire.nodes.values
    }

    function iconLookup(node: PwNode): string {
        for (const prop in node.properties) {
            if (prop.match(/icon.?name/)) {
                return node.properties[prop];
            }
        }

        const entry = DesktopEntries.applications.values.filter(entry => {
            return entry.id.includes(node.name.toLowerCase());
        })[0];

        return entry?.icon ?? "audio-volume-high-symbolic";
    }

    function updateVolume(volume: real) {
        if (defaultAudioSink?.audio)
            defaultAudioSink.audio.volume = volume;
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
