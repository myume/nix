{
  config,
  lib,
  ...
}: {
  options.zsh = {
    enable = lib.mkOption {
      type = lib.types.bool;
      default = false;
      description = "Enable Zsh";
    };
  };
  config = lib.mkIf config.zsh.enable {
    programs.zsh = {
      enable = true;
      interactiveShellInit = let
        startup =
          if config.hyprland.enable
          then "dbus-run-session Hyprland"
          else "niri-session";
      in ''
        if [ -z "''${WAYLAND_DISPLAY}" ] && [ "''${XDG_VTNR}" -eq 1 ]; then
            exec ${startup}
        fi
      '';
    };
  };
}
