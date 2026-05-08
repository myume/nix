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
        command = [
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
        command = [
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
        command = [
          "awww-daemon"
          "-n"
          "overview"
        ];
      }
    ];
in {
  imports = [
    ./settings
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

    programs.niri = {
      settings.spawn-at-startup = autostart;
      enable = true;
    };
  };
}
