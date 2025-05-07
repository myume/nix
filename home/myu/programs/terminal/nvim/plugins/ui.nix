{
  programs.nvf.settings.vim = {
    ui = {
      illuminate.enable = true;
      colorizer.enable = true;
      noice = {
        enable = true;
        setupOpts = {
          cmdline = {
            view = "cmdline";
          };

          presets = {
            lsp_doc_border = true;
            bottom_search = true;
            command_palette = false;
          };

          lsp = {
            signature = {
              enabled = true;
            };
          };
        };
      };
    };
  };
}
