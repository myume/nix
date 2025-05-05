{
  config,
  lib,
  ...
}: {
  options.sddm = {
    enable = lib.mkOption {
      type = lib.types.bool;
      default = false;
      description = "Enable SDDM";
    };

    enableWayland = lib.mkOption {
      type = lib.types.bool;
      default = false;
      description = "Enable Wayland for SDDM";
    };
  };

  config = lib.mkIf config.sddm.enable {
    services.displayManager = {
      sddm = {
        enable = true;
        wayland.enable = config.sddm.enableWayland;
      };
    };
  };
}
