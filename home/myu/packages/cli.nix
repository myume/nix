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
    iotop
    iftop

    brightnessctl
    bluez
    powertop

    silicon # pretty screenshots of code
    hyperfine # cli benchmarking
  ];
}
