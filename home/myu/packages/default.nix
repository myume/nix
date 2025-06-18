{pkgs, ...}: {
  home.packages = with pkgs; [
    fastfetch

    # desktop applications
    gimp3
    discord
    spotify

    # archives
    zip
    xz
    unzip
    p7zip

    # utils
    ripgrep # recursively searches directories for a regex pattern
    jq # A lightweight and flexible command-line JSON processor
    yq-go # yaml processor https://github.com/mikefarah/yq
    fzf # A command-line fuzzy finder
    fd
    ghostscript # render pdf
    tldr

    # misc
    file
    zstd
    gnupg

    btop # replacement of htop/nmon
    iotop # io monitoring
    iftop # network monitoring

    silicon # pretty screenshots of code
    obs-studio

    brightnessctl
    bluez

    powertop
  ];
}
