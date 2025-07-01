{
  inputs,
  lib,
  pkgs,
  ...
}: let
  plugins =
    lib.filesystem.listFilesRecursive ./plugins;
in {
  imports =
    [
      inputs.nvf.homeManagerModules.default

      ./keymaps.nix
      ./autocmds.nix
      ./highlight.nix
    ]
    # import all plugins
    ++ plugins;

  # add lazygit for nvim
  home.packages = [
    pkgs.lazygit
  ];

  programs.nvf = {
    enable = true;
    defaultEditor = true;

    enableManpages = true;

    settings = {
      vim = {
        viAlias = true;
        vimAlias = true;
        searchCase = "smart";

        options = {
          cursorline = true;
          cursorlineopt = "number";
          fillchars = "eob: "; # remove ~ characters on empty lines in the line numbers
          showmode = false;
        };
      };
    };
  };
}
