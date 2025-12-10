{
  pkgs,
  inputs,
  ...
}: {
  programs.zsh.plugins = [
    {
      name = "fzf-tab";
      src = pkgs.zsh-fzf-tab;
      file = "share/fzf-tab/fzf-tab.plugin.zsh";
    }
    {
      name = "vi-mode";
      src = pkgs.zsh-vi-mode;
      file = "share/zsh-vi-mode/zsh-vi-mode.plugin.zsh";
    }
    {
      name = "nix-shell";
      src = pkgs.zsh-nix-shell;
      file = "share/zsh-nix-shell/nix-shell.plugin.zsh";
    }
    {
      name = "zsh-autopair";
      src = pkgs.zsh-autopair;
      file = "share/zsh/zsh-autopair/autopair.zsh";
    }
    {
      name = "dc";
      src = inputs.dc.packages.${pkgs.system}.default;
      file = "share/dc/dc.plugin.zsh";
    }
  ];
}
