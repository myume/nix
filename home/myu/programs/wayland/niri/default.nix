{pkgs, ...}: {
  imports = [
    ./binds.nix
  ];

  home.packages = [
    pkgs.xwayland-satellite
  ];
}
