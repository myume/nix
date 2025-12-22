{pkgs, ...}: {
  home.packages = with pkgs; [
    # desktop applications
    discord
    obs-studio
    obsidian
    youtube-music
    tor-browser
    qbittorrent
    dbeaver-bin
    protonvpn-gui
    ghidra
    readest
  ];
}
