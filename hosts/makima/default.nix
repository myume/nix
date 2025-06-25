{pkgs, ...}: let
  modPath = ../../modules;

  securityImports =
    builtins.map
    (module: "${modPath}/security/${module}.nix")
    [
      "fprint"
      "pam"
      "polkit"
      "sudo"
    ];
in {
  imports =
    [
      "${modPath}/programs"
      "${modPath}/networking"
      "${modPath}/locale"
      "${modPath}/displayManager"
      "${modPath}/services"
      "${modPath}/fonts"

      ./hardware-configuration.nix
    ]
    ++ securityImports;

  boot = {
    # Track the latest Linux kernel release for improved hardware support
    kernelPackages = pkgs.linuxPackages_latest;
    loader = {
      # Bootloader.
      systemd-boot.enable = true;
      efi.canTouchEfiVariables = true; # Did you read the comment?

      # Limit the number of generations to keep
      systemd-boot.configurationLimit = 10;
    };
  };

  services = {
    # Enable firmware updates
    fwupd.enable = true;

    # Configure keymap in X11
    xserver.xkb = {
      layout = "us";
      variant = "";
    };

    # autologin
    getty = {
      autologinUser = "myu";
      autologinOnce = true;
    };
  };

  # Define a user account. Don't forget to set a password with ‘passwd’.
  users.users.myu = {
    isNormalUser = true;
    description = "myu";
    extraGroups = ["networkmanager" "wheel"];
    shell = pkgs.zsh;
  };

  # Allow unfree packages
  nixpkgs.config.allowUnfree = true;

  nix = {
    settings.experimental-features = ["nix-command" "flakes"];

    # Perform garbage collection weekly to maintain low disk usage
    gc = {
      automatic = true;
      dates = "weekly";
      options = "--delete-older-than 1w";
    };

    settings = {
      auto-optimise-store = true;

      # increase to avoid warning and since I have a lot of memory
      download-buffer-size = 524288000; # 500 MB
    };
  };
  environment = {
    systemPackages = with pkgs; [
      git
      vim
      wget
      curl
    ];

    variables = {
      EDITOR = "vim";
      VISUAL = "vim";
    };
  };

  hardware = {
    framework.laptop13.audioEnhancement.enable = true;

    bluetooth = {
      enable = true;
      powerOnBoot = true;
    };
  };

  system.stateVersion = "24.11";
}
