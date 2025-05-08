{
  inputs,
  lib,
  ...
}: {
  imports =
    [
      inputs.nvf.homeManagerModules.default

      ./keymaps.nix
      ./autocmds.nix
    ]
    # import all plugins
    ++ (lib.filesystem.listFilesRecursive ./plugins);

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
        };
      };
    };
  };
}
