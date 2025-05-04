{
  programs.nvf.settings.vim = {
    filetree = {
      nvimTree = {
        enable = true;
        openOnSetup = false;

        mappings = {
          toggle = "<A-a>";
          findFile = "<A-A>";
        };

        setupOpts = {
          disable_netrw = true;

          hijack_cursor = true;
          hijack_unnamed_buffer_when_opening = true;
          hijack_netrw = true;
          hijack_directories = {
            enable = true;
            auto_open = true;
          };

          diagnostics.enable = true;

          git = {
            enable = true;
          };

          modified = {
            enable = true;
            show_on_dirs = false;
            show_on_open_dirs = true;
          };

          view = {
            width = {
              min = 30;
              max = -1;
              padding = 1;
            };
          };
        };
      };
    };
  };
}
