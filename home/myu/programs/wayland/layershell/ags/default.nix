{
  lib,
  config,
  inputs,
  pkgs,
  ...
}: let
  agsPkgs = inputs.ags.packages.${pkgs.stdenv.hostPlatform.system};
in {
  # add the home manager module
  imports = [inputs.ags.homeManagerModules.default];

  options.layer-shell.ags = {
    enable = lib.mkEnableOption "ags";
  };

  config = lib.mkIf config.layer-shell.ags.enable {
    home.packages = with pkgs; [
      papirus-icon-theme # use paprius icons
      rink
      gammastep

      libnotify
    ];

    programs.ags = {
      enable = true;

      # symlink to ~/.config/ags
      configDir = ./src;
      extraPackages = with agsPkgs; [
        apps
        battery
        bluetooth
        hyprland
        mpris
        network
        notifd
        powerprofiles
        tray
        wireplumber
      ];
    };
  };
}
