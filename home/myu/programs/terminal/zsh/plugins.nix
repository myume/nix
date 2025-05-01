{pkgs, ...}: {
  programs.zsh.plugins = [
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
  ];
}
