{
  imports = [./hyprland.nix ./niri.nix];
  programs = {
    zsh.enable = true;
    thunar.enable = true;
    nix-ld.enable = true;
  };
}
