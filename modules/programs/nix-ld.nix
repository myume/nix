{
  config,
  lib,
  ...
}: {
  options.nix-ld = {
    enable = lib.mkOption {
      type = lib.types.bool;
      default = false;
      description = "Enable nix-ld";
    };
  };
  config = lib.mkIf config.nix-ld.enable {
    programs.nix-ld.enable = true;
  };
}
