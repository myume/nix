{
  inputs,
  pkgs,
  ...
}: let
  agsPkgs = inputs.ags.packages.${pkgs.system};

  dependencies = with pkgs; [
    papirus-icon-theme # use paprius icons
    rink
    gammastep
  ];
in {
  # add the home manager module
  imports = [inputs.ags.homeManagerModules.default];

  home.packages =
    [
      agsPkgs.io # expose the astal cli
    ]
    ++ dependencies;

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
      "GSK_RENDERER=cairo ags run --log-file /tmp/ags.log"
    ];
  };
}
