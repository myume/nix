{config, ...}: {
  imports = [
    ./aliases.nix
    ./init.nix
    ./plugins.nix
    ./variables.nix
  ];

  programs.zsh = {
    enable = true;
    dotDir = config.home.homeDirectory;

    # zprof.enable = true;
    enableCompletion = true;
    completionInit = ''
      autoload -Uz compinit
      compinit -C &! # lazy load completion
    '';
    autosuggestion.enable = true;
    syntaxHighlighting.enable = true;
    historySubstringSearch.enable = true;
    autocd = true;
  };
}
