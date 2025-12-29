{pkgs, ...}: {
  home.packages = with pkgs; [
    # desktop applications
    discord
    obs-studio
    obsidian
    pear-desktop
    tor-browser
    qbittorrent
    dbeaver-bin
    protonvpn-gui
    ghidra
    readest
  ];
}
