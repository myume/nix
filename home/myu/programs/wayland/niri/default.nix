{
  pkgs,
  lib,
  config,
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
        ];
      }
    ]
    else [];

  autostart = ags ++ quickshell;
in {
  imports = [
    ./settings.nix
  ];

  options.compositor.niri = {
    enable = lib.mkEnableOption "Niri";
  };

  config = lib.mkIf config.compositor.niri.enable {
    home.packages = [
      pkgs.xwayland-satellite
    ];

    programs.niri.settings.spawn-at-startup = autostart;
  };
}
