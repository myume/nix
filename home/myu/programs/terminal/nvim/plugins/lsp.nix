{
  programs.nvf.settings.vim = {
    lsp = {
      enable = true;
      formatOnSave = true;

      lspkind.enable = true;
      trouble = {
        enable = true;
        setupOpts = {
          auto_close = true;
        };
        mappings = {
          documentDiagnostics = "<leader>xx";
          workspaceDiagnostics = "<leader>xX";
        };
      };

      presets = {
        tailwindcss-language-server.enable = true;
      };

      mappings = {
        goToDefinition = "gd";
        goToType = "gt";
        codeAction = "<C-.>";
        hover = "K";
        nextDiagnostic = "]d";
        previousDiagnostic = "[d";
        renameSymbol = "<A-r>";
      };
    };
  };
}
