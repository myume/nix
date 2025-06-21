{pkgs, ...}: {
  home.packages = with pkgs; [
    # desktop applications
    gimp3
    discord
    spotify
    obs-studio
  ];
}
