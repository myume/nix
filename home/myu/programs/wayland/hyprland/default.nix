{
  lib,
  pkgs,
  ...
}: {
  imports = lib.filesystem.listFilesRecursive ./settings;

  home.packages = with pkgs; [
    hyprshot

    wireplumber
    playerctl
  ];

  hyprland.smartgaps.enable = false;

  wayland.windowManager.hyprland = {
    enable = true;
    systemd.enable = true;
    xwayland.enable = true;
  };
  home.sessionVariables.NIXOS_OZONE_WL = "1";
}
