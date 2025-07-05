{pkgs, ...}: {
  home.packages = with pkgs; [
    # desktop applications
    gimp3
    discord
    obs-studio
    mpv
  ];
}
