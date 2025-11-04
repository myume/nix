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
      loginShellInit = let
        name =
          if config.hyprland.enable
          then "Hyprland"
          else "niri";
      in ''
        if [ -z "''${WAYLAND_DISPLAY}" ] && [ "''${XDG_VTNR}" -eq 1 ]; then
            exec dbus-run-session ${name}
        fi
      '';
    };
  };
}
