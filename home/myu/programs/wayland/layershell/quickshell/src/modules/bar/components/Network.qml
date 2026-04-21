import QtQuick.Effects
import Quickshell
import Quickshell.Widgets
import Quickshell.Networking
import qs.common

IconImage {
    id: root

    readonly property NetworkDevice defaultDevice: getPrimaryDevice()
    readonly property string iconName: {
        if (!defaultDevice || defaultDevice.type === DeviceType.None) {
            return "network-wireless-offline-symbolic";
        }

        if (defaultDevice.type === DeviceType.Wired) {
            let status = "disconnected";
            switch (defaultDevice.state) {
            case ConnectionState.Unknown:
                status = "no-route";
                break;
            case ConnectionState.Disconnected:
                status = "disconnected";
                break;
            case ConnectionState.Connecting:
                status = "acquiring";
                break;
            case ConnectionState.Connected:
                status = `activated`;
                break;
            }
            if (Networking.connectivity == NetworkConnectivity.Limited) {
                status = "error";
            }
            return `network-wired-${status}-symbolic`;
        }

        if (defaultDevice.type === DeviceType.Wifi) {
            let status = "disconnected";
            switch (Networking.connectivity) {
            case NetworkConnectivity.Full:
                {
                    switch (defaultDevice.state) {
                    case ConnectionState.Unknown:
                        status = "no-route";
                        break;
                    case ConnectionState.Disconnected:
                        status = "disconnected";
                        break;
                    case ConnectionState.Connecting:
                        status = "acquiring";
                        break;
                    case ConnectionState.Connected:
                        const net = defaultDevice.networks.values.filter(net => net.connected)[0];
                        const signal = Math.round(net.signalStrength * 5) * 20;
                        status = `connected-${signal}`;
                        break;
                    }
                    break;
                }
            case NetworkConnectivity.Limited:
                status = "error";
                break;
            case NetworkConnectivity.Unknown:
                status = "no-route";
                break;
            }
            return `network-wireless-${status}-symbolic`;
        }
    }

    function getPrimaryDevice() {
        let wired = null;
        let wireless = null;

        for (const dev of Networking.devices.values) {
            if (dev.connected) {
                if (dev.type === DeviceType.Wired) {
                    wired = dev;
                    break;
                }
                if (dev.type === DeviceType.Wifi) {
                    wireless = dev;
                }
            }
        }

        return wired || wireless;
    }

    implicitSize: Theme.iconSize
    source: Quickshell.iconPath(iconName)

    layer {
        enabled: true
        effect: MultiEffect {
            colorization: 1.0
            brightness: 0.2
            colorizationColor: Colors.text
        }
    }
}
