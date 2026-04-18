{
  lib,
  pkgs,
  ...
}: {
  imports = lib.filesystem.listFilesRecursive ./settings;

  home.packages = with pkgs; [
    # hyprshot

    wireplumber
    playerctl
  ];

  hyprland.smartgaps.enable = false;

  wayland.windowManager.hyprland = {
    enable = false;
    systemd.enable = true;
    xwayland.enable = true;
    settings = {
      exec-once = [
        "ags run --log-file /tmp/ags.log"
      ];
    };
  };
  home.sessionVariables.NIXOS_OZONE_WL = "1";
}
