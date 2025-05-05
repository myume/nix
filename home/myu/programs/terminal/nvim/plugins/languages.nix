{
  programs.nvf.settings.vim = {
    lsp.enable = true;
    languages = {
      enableFormat = true;
      enableTreesitter = true;
      enableExtraDiagnostics = true;

      bash.enable = true;
      css.enable = true;
      clang.enable = true;
      go.enable = true;
      haskell.enable = true;
      html.enable = true;
      markdown = {
        enable = true;
        extensions.render-markdown-nvim.enable = true;
      };
      nix.enable = true;
      python.enable = true;
      rust.enable = true;
      ts.enable = true;

      # lua.enable = true;
      # sql.enable = true;
      # tailwind.enable = true;
      # zig.enable = true;
    };
  };
}
