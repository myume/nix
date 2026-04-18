{
  lib,
  pkgs,
  config,
  ...
}: let
  ags =
    if config.layer-shell.ags.enable
    then ["ags run --log-file /tmp/ags.log"]
    else [];

  quickshell =
    if config.layer-shell.quickshell.enable
    then ["quickshell"]
    else [];

  autostart = ags ++ quickshell;
in {
  imports = lib.filesystem.listFilesRecursive ./settings;

  options.compositor.hyprland = {
    enable = lib.mkEnableOption "Hyprland";
  };

  config = lib.mkIf config.compositor.hyprland.enable {
    home.packages = with pkgs; [
      # hyprshot

      wireplumber
      playerctl
    ];

    wayland.windowManager.hyprland = {
      enable = true;
      systemd.enable = true;
      xwayland.enable = true;
      settings = {
        exec-once = autostart;
      };
    };
  };
}
