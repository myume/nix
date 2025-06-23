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

  # attempt to fix "Gdk-Message: Error 71 (Protocol error) dispatching to Wayland display."
  home.sessionVariables = {
    GSK_RENDERER = "ngl";
  };

  programs.ags = {
    enable = true;

    # symlink to ~/.config/ags
    configDir = ./src;
    extraPackages = with agsPkgs; [
      apps
      battery
      bluetooth
      cava
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
      "ags run --gtk4 --log-file /tmp/ags.log"
    ];
  };
}
