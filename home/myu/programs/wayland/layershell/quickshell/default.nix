{
  lib,
  config,
  inputs,
  pkgs,
  ...
}: let
  quickshell = inputs.quickshell.packages.${pkgs.stdenv.hostPlatform.system}.default;
in {
  options.layer-shell.quickshell = {
    enable = lib.mkEnableOption "quickshell";
  };

  config = lib.mkIf config.layer-shell.quickshell.enable {
    home.packages = [
      quickshell
      pkgs.papirus-icon-theme
      inputs.fsel.packages.${pkgs.stdenv.hostPlatform.system}.default
    ];

    xdg.configFile."fsel/config.toml".text = ''
      terminal_launcher = "kitty -e"
    '';

    xdg.configFile."quickshell".source = ./src;
  };
}
