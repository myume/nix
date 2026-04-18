{
  lib,
  config,
  ...
}: {
  options.layer-shell.quickshell = {
    enable = lib.mkEnableOption "quickshell";
  };

  config = lib.mkIf config.layer-shell.quickshell.enable {
    programs.quickshell = {
      enable = true;
    };
  };
}
