{inputs, ...}: {
  imports = [
    inputs.nvf.homeManagerModules.default
  ];

  programs.nvf = {
    enable = true;
    defaultEditor = true;

    enableManpages = true;

    settings = {
      vim = {
        viAlias = true;
        vimAlias = true;
        lsp = {enable = true;};

        theme = {
          enable = true;
          name = "catppuccin";
          style = "mocha";
        };

        statusline.lualine.enable = true;
        autocomplete.nvim-cmp.enable = true;
        tabline.nvimBufferline.enable = true;
        utility.yazi-nvim.enable = true;
        formatter.conform-nvim.enable = true;
        autopairs.nvim-autopairs.enable = true;

        languages = {
          nix = {
            enable = true;
            format = {enable = true;};
            lsp = {enable = true;};
          };
        };

        keymaps = [
          {
            key = "kj";
            mode = ["i"];
            action = "<ESC>";
            desc = "Enter normal mode";
          }
        ];
      };
    };
  };
}
