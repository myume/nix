{
  config,
  lib,
  ...
}: {
  options.steam = {
    enable = lib.mkEnableOption "steam";
  };

  config = lib.mkIf config.steam.enable {
    programs.steam = {
      enable = true;
    };
  };
}
