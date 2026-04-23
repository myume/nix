import QtQuick
import qs.services

OsdSlider {
    visible: true
    percentage: AudioService.defaultAudioSink.audio.volume
    iconName: AudioService.iconName
}
