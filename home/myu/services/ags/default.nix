{
  inputs,
  pkgs,
  ...
}: let
  agsPkgs = inputs.ags.packages.${pkgs.system};

  agsLibs = with agsPkgs; [
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
  # Create AGS package with extra modules
  agsWithExtras = agsPkgs.default.override {
    extraPackages = agsLibs;
  };
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
    extraPackages = agsLibs;
  };

  # Create systemd user service
  systemd.user.services.ags = {
    Unit = {
      Description = "Aylur's Gtk Shell";
      PartOf = [
        "tray.target"
        "graphical-session.target"
      ];
      After = ["graphical-session.target"];
    };

    Service = {
      ExecStart = "${agsWithExtras}/bin/ags run --gtk4";
      Restart = "on-failure";
    };

    Install.WantedBy = ["graphical-session.target"];
  };
}
