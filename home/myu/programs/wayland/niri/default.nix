{
  pkgs,
  lib,
  config,
  ...
}: {
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
  };
}
