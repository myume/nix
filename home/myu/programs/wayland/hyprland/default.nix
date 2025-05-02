{
  lib,
  pkgs,
  ...
}: {
  imports = lib.filesystem.listFilesRecursive ./settings;

  home.packages = with pkgs; [
    hypridle
    hyprshot
    hyprlock

    wireplumber
    playerctl
  ];

  wayland.windowManager.hyprland = {
    enable = true;
    systemd.enable = true;
    xwayland.enable = true;
    # extraConfig = ''
    #   ${builtins.readFile ./config.conf}
    # '';
  };
  home.sessionVariables.NIXOS_OZONE_WL = "1";
}
