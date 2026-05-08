{
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
    programs.niri = {
      enable = true;
    };
  };
}
