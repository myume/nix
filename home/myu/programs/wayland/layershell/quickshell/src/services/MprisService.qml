pragma ComponentBehavior: Bound
pragma Singleton

import QtQuick
import Quickshell
import Quickshell.Services.Mpris

Singleton {
    id: root

    property MprisPlayer activePlayer: playerStack[playerStack.length - 1] ?? null

    // MRU cache for players
    // full MRU might be overkill here
    // approximate if this becomes a performance issue (i doubt it)
    property var playerStack: []

    Instantiator {
        model: Mpris.players

        onObjectAdded: index => {
            const addedPlayer = Mpris.players.values[index];
            if (addedPlayer.isPlaying) {
                root.playerStack.push(addedPlayer);
                root.playerStackChanged();
            }
        }

        onObjectRemoved: index => {
            const removedPlayer = Mpris.players.values[index];
            root.playerStack = root.playerStack.filter(player => player.identity !== removedPlayer.identity);
        }

        Connections {
            required property MprisPlayer modelData

            target: modelData

            function onIsPlayingChanged() {
                const updatedState = root.playerStack.filter(player => player.identity !== modelData.identity);
                if (modelData.isPlaying) {
                    updatedState.push(modelData);
                }
                root.playerStack = updatedState;
            }
        }
    }
}
