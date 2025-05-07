{
  inputs,
  pkgs,
  ...
}: {
  # add the home manager module
  imports = [inputs.ags.homeManagerModules.default];

  # expose the astal cli
  home.packages = [inputs.ags.packages.${pkgs.system}.io];

  programs.ags = {
    enable = true;

    # symlink to ~/.config/ags
    configDir = ./src;
  };
}
