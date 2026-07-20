{pkgs, ...}: {
  home.packages = with pkgs; [
    # desktop applications
    discord
    obs-studio
    obsidian
    tor-browser
    qbittorrent
    dbeaver-bin
    proton-vpn
    readest
    godot
    krita
    rnote
    chromium
  ];
}
