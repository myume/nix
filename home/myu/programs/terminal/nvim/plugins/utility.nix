{
  programs.nvf.settings.vim = {
    utility = {
      # yazi-nvim.enable = true;
      diffview-nvim.enable = true;
      surround = {
        enable = true;
        useVendoredKeybindings = false;
      };
      outline.aerial-nvim = {
        enable = true;
        mappings.toggle = "<A-o>";
      };

      # bro this plugin is literally like 20 different plugins combined
      snacks-nvim = {
        enable = true;
        setupOpts = {
          input = {
            enabled = true;
            win = {
              relative = "cursor";
              row = -3;
              col = 0;
              width = 25;
            };
          };

          picker = {
            enabled = true;
            sources = {
              smart = {
                title = "Files";
                filter = {
                  cwd = true;
                  paths = {
                    "^.git" = true;
                  };
                };
              };
            };
          };

          bigfile.enabled = true;
          lazygit.enabled = true;
          quickfile.enabled = true;
          statuscolumn.enabled = true;
          image.enabled = true;
          zen.enabled = true;
          rename.enabled = true;
          notifier.enabled = true;
          notify.enabled = true;
          words.enabled = true;
        };
      };
    };
  };
}
