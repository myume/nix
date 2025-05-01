{
  programs.nvf.settings.vim = {
    treesitter = {
      context.enable = true;
      fold = true;
      autotagHtml = true;
      indent.enable = false; # wonky for some reason
    };
  };
}
