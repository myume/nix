{
  programs.nvf.settings.vim = {
    git = {
      gitsigns = {
        enable = true;
        setupOpts = {
          # current_line_blame = true;
          current_line_blame_opts = {
            delay = 100;
          };
        };
      };
    };
  };
}
