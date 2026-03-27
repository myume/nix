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
    proton-vpn
    readest
    godot
    krita
  ];
}
