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
    enableManpages = false;

    settings = {
      vim = {
        viAlias = true;
        vimAlias = true;
        searchCase = "smart";

        options = {
          cursorline = true;
          cursorlineopt = "number";
          fillchars = "fold: ,foldopen:,foldclose:,foldsep: ,diff:╱,eob: ";
          diffopt = "internal,filler,closeoff,algorithm:histogram,indent-heuristic,linematch:60";
          showmode = false;

          tabstop = 4;
          shiftwidth = 4;
          expandtab = true;
        };
      };
    };
  };
}
