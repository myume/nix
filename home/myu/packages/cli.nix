{pkgs, ...}: {
  home.packages = with pkgs; [
    # archives
    zip
    xz
    unzip
    p7zip

    # utils
    ripgrep
    jq
    yq-go
    fzf
    fd
    ghostscript
    tldr

    # misc
    file
    zstd
    gnupg

    # monitoring
    btop
    iotop
    iftop

    silicon # pretty screenshots of code

    brightnessctl
    bluez
    powertop
  ];
}
