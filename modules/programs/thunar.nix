{
  config,
  lib,
  ...
}: {
  options.thunar = {
    enable = lib.mkOption {
      type = lib.types.bool;
      default = false;
      description = "Enable Thunar";
    };
  };
  config = lib.mkIf config.thunar.enable {
    programs.thunar.enable = true;
  };
}
