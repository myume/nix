pragma ComponentBehavior: Bound
import QtQuick
import QtQuick.Effects
import QtQuick.Layouts
import QtQuick.Controls
import Quickshell
import Quickshell.Widgets
import Quickshell.Services.Mpris
import qs.common
import qs.components
import qs.services

Popup {
    id: root
    property MprisPlayer activePlayer: MprisService.activePlayer
    padding: 32

    Loader {
        active: root.activePlayer
        sourceComponent: ColumnLayout {
            spacing: 16
            RowLayout {
                spacing: 16
                ClippingRectangle {
                    visible: art.source !== ""
                    radius: Theme.cornerRadius / 2
                    implicitWidth: art.implicitWidth
                    implicitHeight: art.implicitHeight
                    color: "transparent"

                    IconImage {
                        id: art
                        implicitSize: 72
                        source: {
                            const fallback = Quickshell.iconPath(MprisService.playerEntry?.icon ?? "audio-x-generic-symbolic");
                            return root.activePlayer.trackArtUrl || fallback;
                        }
                        layer {
                            enabled: art.source.toString().endsWith("symbolic")
                            effect: MultiEffect {
                                colorization: 1.0
                                brightness: 0.5
                                colorizationColor: Colors.text
                            }
                        }
                    }
                }

                ColumnLayout {
                    Text {
                        text: root.activePlayer.trackTitle || "Unknown Title"
                        wrapMode: Text.WrapAtWordBoundaryOrAnywhere
                        font.family: Theme.fontFamily
                        font.pixelSize: Theme.font.pixelSize * 2
                        font.weight: 600
                        color: Colors.text
                        Layout.maximumWidth: 200
                        maximumLineCount: 2
                        elide: Text.ElideRight
                    }
                    Text {
                        text: root.activePlayer.trackArtist || "Unknown Artist"
                        font.pixelSize: Theme.font.pixelSize * 1.2
                        font.weight: 500
                        color: Colors.text
                        Layout.maximumWidth: 200
                        maximumLineCount: 1
                        elide: Text.ElideRight
                    }
                }

                RowLayout {
                    visible: root.activePlayer.canControl
                    Layout.alignment: Qt.AlignHCenter
                    Layout.fillWidth: true

                    RoundButton {
                        visible: root.activePlayer.canGoPrevious
                        onClicked: root.activePlayer.previous()

                        implicitHeight: 32
                        icon.color: Colors.text
                        background: null
                        icon.source: Quickshell.iconPath("media-skip-backward-symbolic")
                    }

                    RoundButton {
                        visible: root.activePlayer.canTogglePlaying
                        onClicked: root.activePlayer.togglePlaying()

                        implicitHeight: 32
                        icon.color: Colors.text
                        background: null
                        icon.source: Quickshell.iconPath(root.activePlayer.isPlaying ? "media-playback-pause-symbolic" : "media-playback-start-symbolic")
                    }
                    RoundButton {
                        visible: root.activePlayer.canGoNext
                        onClicked: root.activePlayer.next()

                        implicitHeight: 32
                        icon.color: Colors.text
                        background: null
                        icon.source: Quickshell.iconPath("media-skip-forward-symbolic")
                    }
                }
            }

            Slider {
                visible: root.activePlayer.positionSupported && root.activePlayer.lengthSupported
                Layout.fillWidth: true
                implicitHeight: 4
                percentage: Math.min(root.activePlayer.position / root.activePlayer.length, 1)
                enableAnimations: false

                FrameAnimation {
                    running: root.activePlayer && root.activePlayer.playbackState === MprisPlaybackState.Playing
                    onTriggered: if (root.activePlayer) {
                        root.activePlayer.positionChanged();
                    }
                }
            }
        }
    }
}
