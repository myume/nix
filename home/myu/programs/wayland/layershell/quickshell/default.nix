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
    ];

    xdg.configFile."quickshell".source = ./src;
  };
}
