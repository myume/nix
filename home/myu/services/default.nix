{
  imports = [
    ./hypridle.nix
    ./hyprpaper
    ./waysted.nix
    ./wally.nix
  ];

  services.awww.enable = true;
}
