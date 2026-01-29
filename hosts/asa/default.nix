{
  pkgs,
  lib,
  ...
}: let
  tunnel_id = "9bab2b63-839a-4cfe-bae3-c82e31b8d4d9";
in {
  imports = [
    ./hardware-configuration.nix
    ../../modules/networking
    ../../modules/locale
  ];

  boot.loader.systemd-boot.enable = true;
  boot.loader.efi.canTouchEfiVariables = true;

  services.xserver.xkb = {
    layout = "us";
    variant = "";
  };

  users.users.yum = {
    isNormalUser = true;
    description = "yum";
    extraGroups = ["networkmanager" "wheel"];
    packages = with pkgs; [];
  };

  nixpkgs.config.allowUnfree = true;

  nix.settings.experimental-features = ["nix-command" "flakes"];
  environment.systemPackages = with pkgs; [
    vim
    git
  ];

  services = {
    openssh.enable = true;

    getty = {
      autologinUser = "yum";
    };

    logind = {
      settings.Login = {
        HandleLidSwitch = "ignore";
        HandleLidSwitchDocked = "ignore";
        HandleLidSwitchExternalPower = "ignore";
        IdleAction = "ignore";
        HandlePowerKey = "ignore";
        HandleSuspendKey = "ignore";
      };
    };

    cloudflared = {
      enable = true;
      tunnels = {
        "${tunnel_id}" = {
          credentialsFile = "/home/yum/.cloudflared/${tunnel_id}.json";
          default = "http_status:404";
        };
      };
    };

    forgejo = {
      enable = true;
      database.type = "postgres";
      lfs.enable = true;
      settings = {
        server = {
          DOMAIN = "git.meyume.com";
          ROOT_URL = "https://git.meyume.com/";
          HTTP_ADDR = "127.0.0.1";
          HTTP_PORT = 3000;
        };
        service.DISABLE_REGISTRATION = true;
        actions = {
          ENABLED = true;
          DEFAULT_ACTIONS_URL = "github";
        };
      };
    };
  };

  systemd.services."cloudflared-tunnel-${tunnel_id}".serviceConfig = {
    Restart = lib.mkForce "always";
    RestartSec = lib.mkForce "5s";
  };

  # This value determines the NixOS release from which the default
  # settings for stateful data, like file locations and database versions
  # on your system were taken. It‘s perfectly fine and recommended to leave
  # this value at the release version of the first install of this system.
  # Before changing this value read the documentation for this option
  # (e.g. man configuration.nix or on https://nixos.org/nixos/options.html).
  system.stateVersion = "25.11"; # Did you read the comment?
}
