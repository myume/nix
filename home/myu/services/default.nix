{
  imports = [
    ./hypridle.nix
    ./hyprpaper
    ./ags
    ./waysted.nix
    ./wally.nix
  ];

  services.awww.enable = true;
}
