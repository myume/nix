{
  imports = [
    ./aliases.nix
    ./init.nix
    ./plugins.nix
    ./variables.nix
  ];

  programs.zsh = {
    enable = true;

    enableCompletion = true;
    autosuggestion.enable = true;
    syntaxHighlighting.enable = true;
    historySubstringSearch.enable = true;
    autocd = true;
  };
}
