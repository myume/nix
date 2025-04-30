{
  programs.kitty = {
    enable = true;

    themeFile = "Catppuccin-Mocha";

    settings = import ./settings.nix;
    keybindings = import ./keybindings.nix;
  };
}
