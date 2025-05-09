{
  programs.nvf.settings.vim = {
    ui = {
      colorizer.enable = true;
      noice = {
        enable = true;
        setupOpts = {
          cmdline = {
            view = "cmdline";
          };

          routes = [
            {
              view = "notify";
              filter = {event = "msg_showmode";};
            }
          ];

          presets = {
            lsp_doc_border = true;
            bottom_search = true;
            command_palette = true;
          };

          lsp = {
            signature = {
              enabled = true;
            };
          };
        };
      };

      borders.plugins = {
        nvim-cmp = {
          enable = true;
        };
      };
    };
  };
}
