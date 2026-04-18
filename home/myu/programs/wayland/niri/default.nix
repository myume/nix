{pkgs, ...}: {
  imports = [
    ./settings.nix
  ];

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
}
