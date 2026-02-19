{
  inputs,
  pkgs,
  config,
  lib,
  ...
}: {
  options.niri = {
    enable = lib.mkOption {
      type = lib.types.bool;
      default = false;
      description = "Enable Niri";
    };
  };

  config = lib.mkIf config.niri.enable {
    nixpkgs.overlays = [inputs.niri.overlays.niri];
    programs.niri = {
      enable = true;
      package = pkgs.niri-unstable;
    };
    systemd.user.services.niri-flake-polkit.enable = false;
  };
}
