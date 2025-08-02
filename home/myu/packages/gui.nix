{pkgs, ...}: {
  home.packages = with pkgs; [
    # desktop applications
    gimp3
    discord
    obs-studio
    obsidian
    readest
    youtube-music
    tor-browser
    qbittorrent
    inkscape
    dbeaver-bin
  ];
}
