{
  config,
  lib,
  ...
}: {
  options.hyprland = {
    enable = lib.mkOption {
      type = lib.types.bool;
      default = false;
      description = "Enable Hyprland";
    };
  };

  config = lib.mkIf config.hyprland.enable {
    hyprland.enable = true;
  };
}
