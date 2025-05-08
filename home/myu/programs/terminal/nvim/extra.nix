{pkgs, ...}: {
  programs.nvf.settings.vim.extraPlugins = {
    # fixes indentation
    # https://github.com/NotAShelf/nvf/discussions/750#discussioncomment-12671186
    "guess-indent" = {
      package = pkgs.vimPlugins.guess-indent-nvim;
      setup = ''
        require("guess-indent").setup()
      '';
    };
  };
}
