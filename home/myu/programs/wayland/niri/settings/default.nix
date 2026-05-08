{
  imports = [
    ./input.nix
    ./layout.nix
    ./binds.nix
    ./rules.nix
  ];

  programs.ciri.settings = {
    blur = {
      # passes = 4;
      offset = 8.0;
    };

    clipboard.disable-primary = true;
    gestures.hot-corners.off = true;
    hotkey-overlay.skip-at-startup = true;
    prefer-no-csd = true;

    screenshot-path = "~/Pictures/Screenshots/%Y-%m-%dT%H:%M:%S.png";

    cursor = {
      xcursor-theme = "Bibata-Original-Ice";
      xcursor-size = 16;
      hide-after-inactive-ms = 1000;
    };
  };
}
