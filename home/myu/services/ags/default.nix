{
  inputs,
  pkgs,
  ...
}: let
  agsPkgs = inputs.ags.packages.${pkgs.system};
in {
  # add the home manager module
  imports = [inputs.ags.homeManagerModules.default];

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

  wayland.windowManager.hyprland.settings = {
    exec-once = [
      "ags run --log-file /tmp/ags.log"
    ];
  };
}
