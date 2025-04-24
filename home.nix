{ config, pkgs, inputs, ... }:
{
  home.username = "myu";
  home.homeDirectory = "/home/myu";

  # Packages that should be installed to the user profile.
  home.packages = with pkgs; [
    fastfetch
    yazi # terminal file explorer

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
    tree
    zstd
    gnupg

    btop  # replacement of htop/nmon
    iotop # io monitoring
    iftop # network monitoring
  ];

   wayland.windowManager.hyprland = {
    enable = true;
    systemd.enable = true;
    xwayland.enable = true;
    extraConfig = ''
      ${builtins.readFile ./example.conf}
    ''; 
  };

  # basic configuration of git, please change to your own
  programs.git = {
    enable = true;
    userName = "myu";
    userEmail = "contact@memyu.com";
    extraConfig = {
      init.defaultBranch = "main";
    };
  };

  # starship - an customizable prompt for any shell
  programs.starship = {
    enable = true;
    # custom settings
    settings = {
      add_newline = false;
      aws.disabled = true;
      gcloud.disabled = true;
      line_break.disabled = true;
    };
  };

  # this value determines the home manager release that your
  # configuration is compatible with. this helps avoid breakage
  # when a new home manager release introduces backwards
  # incompatible changes.
  #
  # you can update home manager without changing this value. see
  # the home manager release notes for a list of state version
  # changes in each release.
  home.stateVersion = "24.11";

  # let home manager install and manage itself.
  programs.home-manager.enable = true;
}
