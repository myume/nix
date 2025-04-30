{
  programs.nvf.settings.vim = {
    telescope = {
      enable = true;
      mappings = {
        findFiles = "<C-p>";
      };
      setupOpts.defaults = {
        layout_config = {
          width = 0.9;
          horizontal = {
            preview_width = 0.5;
          };
        };
      };
    };
  };
}
