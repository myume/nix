{ config, pkgs, inputs, lib, ... }: {
  imports = [ inputs.nvf.homeManagerModules.default ];
  home.username = "myu";
  home.homeDirectory = "/home/myu";

  # Packages that should be installed to the user profile.
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
    # eza # A modern replacement for ‘ls’
    fzf # A command-line fuzzy finder

    # misc
    file
    tree
    zstd
    gnupg

    btop # replacement of htop/nmon
    iotop # io monitoring
    iftop # network monitoring
  ];

  programs.zsh = {
    enable = true;
    enableCompletion = true;
    autosuggestion.enable = true;
    syntaxHighlighting.enable = true;
    autocd = true;

    defaultKeymap = "viins";

    shellAliases = {
      ll = "ls -l";
      la = "ls -a";
      rebuild = "sudo nixos-rebuild switch";
    };

    initContent = ''
      bindkey '^ ' autosuggest-accept
    '';
  };

  programs.nvf = {
    enable = true;
    defaultEditor = true;

    enableManpages = true;

    settings = {
      vim = {
        viAlias = true;
        vimAlias = true;
        lsp = { enable = true; };

        theme = {
          enable = true;
          name = "tokyonight";
          style = "moon";
        };

        statusline.lualine = { enable = true; };
        autocomplete.nvim-cmp.enable = true;

        keymaps = [{
          key = "kj";
          mode = [ "i" ];
          action = "<ESC>";
          desc = "Enter normal mode";
        }];
      };
    };

  };

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
    extraConfig = { init.defaultBranch = "main"; };
  };

  programs.ssh = {
    enable = true;
    matchBlocks = {
      "github.com" = {
        hostname = "github.com";
        user = "git";
        identityFile = "~/.ssh/id_ed25519";
      };
    };
  };

  # starship - an customizable prompt for any shell
  programs.starship = {
    enable = true;
    enableZshIntegration = true; # Enable integration with Zsh
    settings = {
      add_newline = true; # Add a blank line between prompts
      scan_timeout = 30; # Timeout for scanning files (in milliseconds)
      command_timeout = 500; # Timeout for commands (in milliseconds)
      character = {
        success_symbol =
          "[➜](bold green)"; # Symbol shown on successful command execution
        error_symbol = "[➜](bold red)"; # Symbol shown on command error
      };
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
