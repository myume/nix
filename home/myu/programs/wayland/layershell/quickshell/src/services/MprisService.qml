pragma ComponentBehavior: Bound
pragma Singleton

import QtQuick
import Quickshell
import Quickshell.Services.Mpris

Singleton {
    id: root

    property MprisPlayer activePlayer: playingStack[playingStack.length - 1] ?? pausedStack[pausedStack.length - 1] ?? null
    property DesktopEntry playerEntry: {
        let entry = null;
        if (!activePlayer) {
            return null;
        }

        if (activePlayer.desktopEntry !== "") {
            return DesktopEntries.heuristicLookup(activePlayer.desktopEntry);
        }

        return DesktopEntries.heuristicLookup(activePlayer.identity);
    }

    // MRU cache for players
    // full MRU might be overkill here
    // approximate if this becomes a performance issue (i doubt it)
    property var playingStack: []
    property var pausedStack: Mpris.players.values.filter(player => !player.isPlaying)

    Instantiator {
        model: Mpris.players

        onObjectAdded: index => {
            const addedPlayer = Mpris.players.values[index];
            if (addedPlayer.isPlaying) {
                root.playingStack = [...root.playingStack, addedPlayer];
            } else {
                root.pausedStack = [...root.pausedStack, addedPlayer];
            }
        }

        onObjectRemoved: index => {
            if (index < Mpris.players.values.length) {
                const removedPlayer = Mpris.players.values[index];
                root.playingStack = root.playingStack.filter(player => player?.identity !== removedPlayer.identity);
                root.pausedStack = root.pausedStack.filter(player => player?.identity !== removedPlayer.identity);
            }
        }

        Connections {
            required property MprisPlayer modelData

            target: modelData

            function onIsPlayingChanged() {
                if (modelData.isPlaying) {
                    root.pausedStack = root.pausedStack.filter(player => player.identity !== modelData.identity);
                    root.playingStack = [...root.playingStack, modelData];
                } else {
                    root.playingStack = root.playingStack.filter(player => player.identity !== modelData.identity);
                    root.pausedStack = [...root.pausedStack, modelData];
                }
            }
        }
    }
}
