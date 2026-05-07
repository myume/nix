{
  pkgs,
  lib,
  config,
  inputs,
  ...
}: let
  ags =
    if config.layer-shell.ags.enable
    then [
      {
        argv = [
          "ags"
          "run"
          "--log-file"
          "/tmp/ags.log"
        ];
      }
    ]
    else [];

  quickshell =
    if config.layer-shell.quickshell.enable
    then [
      {
        argv = [
          "quickshell"
          "-d"
        ];
      }
    ]
    else [];

  autostart =
    ags
    ++ quickshell
    ++ [
      {
        argv = [
          "awww-daemon"
          "-n"
          "overview"
        ];
      }
    ];
in {
  imports = [
    ./settings.nix
    ./ciri.nix
    inputs.ciri.homeManagerModules.default
  ];

  options.compositor.niri = {
    enable = lib.mkEnableOption "Niri";
  };

  config = lib.mkIf config.compositor.niri.enable {
    home.packages = [
      pkgs.xwayland-satellite
      pkgs.playerctl
    ];

    programs.niri.settings.spawn-at-startup = autostart;

    programs.ciri.enable = true;
  };
}
