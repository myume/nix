{
  inputs,
  pkgs,
  ...
}: {
  home.packages = with pkgs; [
    fastfetch
    yazi # terminal file explorer
    rofi

    kitty # terminal

    # browser
    inputs.zen-browser.packages."${pkgs.system}".twilight

    # archives
    zip
    xz
    unzip
    p7zip

    # utils
    ripgrep # recursively searches directories for a regex pattern
    jq # A lightweight and flexible command-line JSON processor
    yq-go # yaml processor https://github.com/mikefarah/yq
    eza # A modern replacement for ‘ls’
    fzf # A command-line fuzzy finder

    # misc
    file
    zstd
    gnupg

    btop # replacement of htop/nmon
    iotop # io monitoring
    iftop # network monitoring
  ];
}
