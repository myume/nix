{
  programs.nvf.settings.vim = {
    lsp = {
      enable = true;
      formatOnSave = true;

      lspSignature.enable = true;
      lspkind.enable = true;
      lspsaga = {
        enable = true;
        setupOpts = {
          lightbulb.enable = false;
        };
      };
    };
  };
}
