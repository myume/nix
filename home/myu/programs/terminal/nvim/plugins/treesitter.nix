{pkgs, ...}: {
  programs.nvf.settings.vim = {
    treesitter = {
      enable = true;
      fold = true;
      autotagHtml = true;
      indent.enable = true;

      grammars = with pkgs.vimPlugins.nvim-treesitter.builtGrammars; [
        typescript # in language settings only tsx gets enabled, not typescript
      ];
    };
  };
}
