{
  inputs,
  pkgs,
  ...
}: let
  agsPkgs = inputs.ags.packages.${pkgs.system};
in {
  # add the home manager module
  imports = [inputs.ags.homeManagerModules.default];

  home.packages = [
    agsPkgs.io # expose the astal cli
    pkgs.papirus-icon-theme # use paprius icons
  ];

  programs.ags = {
    enable = true;

    # symlink to ~/.config/ags
    configDir = ./src;
    extraPackages = with agsPkgs; [
      apps
      # auth
      battery
      bluetooth
      cava
      # greet
      hyprland
      mpris
      network
      notifd
      powerprofiles
      tray
      wireplumber
    ];
  };
}
