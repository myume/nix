{ pkgs, ... }:
{
  programs.nvf.settings.vim.extraPlugins = {
    # fixes indentation
    # https://github.com/NotAShelf/nvf/discussions/750#discussioncomment-12671186
    guess-indent = {
      package = pkgs.vimPlugins.guess-indent-nvim;
      setup = ''
        require("guess-indent").setup()
      '';
    };
    grug-far = {
      package = pkgs.vimPlugins.grug-far-nvim;
      setup = ''
        require("grug-far").setup()
      '';
    };

    dropbar = {
      package = pkgs.vimPlugins.dropbar-nvim;
      setup = ''
        require("dropbar").setup()
      '';
    };

    no-neck-pain-nvim = {
      package = pkgs.vimPlugins.no-neck-pain-nvim;
      setup = ''
        require("no-neck-pain").setup({
          width = 120,
          mappings = {
            enabled = true,
          },
        })
      '';
    };
  };
}
