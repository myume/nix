{
  lib,
  pkgs,
  config,
  ...
}: {
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
        exec-once = [
          "ags run --log-file /tmp/ags.log"
        ];
      };
    };
  };
}
