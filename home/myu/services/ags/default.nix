{
  inputs,
  pkgs,
  ...
}: let
  agsPkgs = inputs.ags.packages.${pkgs.stdenv.hostPlatform.system};
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

  programs.niri.settings.spawn-at-startup = [
    {
      argv = [
        "ags"
        "run"
        "--log-file"
        "/tmp/ags.log"
      ];
    }
  ];
}
