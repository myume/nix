{
  programs.nvf.settings.vim = {
    languages = {
      enableFormat = true;
      enableTreesitter = true;
      enableExtraDiagnostics = true;

      bash.enable = true;
      css.enable = true;
      clang.enable = true;
      go.enable = true;
      html.enable = true;
      markdown = {
        enable = true;
        extensions.render-markdown-nvim.enable = true;
      };
      nix.enable = true;
      python.enable = true;
      rust = {
        enable = true;
        format.enable = true;
        extensions = {
          crates-nvim.enable = true;
        };
      };
      ts.enable = true;
      gleam.enable = true;
      json.enable = true;
      astro.enable = true;
      qml.enable = true;

      # sql.enable = true;
      # lua.enable = true;
      # zig.enable = true;
      # haskell.enable = true;
    };
  };
}
