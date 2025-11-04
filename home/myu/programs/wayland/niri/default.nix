{pkgs, ...}: {
  imports = [
    ./settings.nix
  ];

  home.packages = [
    pkgs.xwayland-satellite
  ];
}
