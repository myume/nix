{
  programs.zsh = {
    enable = true;
    enableCompletion = true;
    autosuggestion.enable = true;
    syntaxHighlighting.enable = true;
    autocd = true;

    defaultKeymap = "viins";

    shellAliases = {
      ll = "ls -l";
      la = "ls -a";
      rebuild = "sudo nixos-rebuild switch";
    };

    initContent = ''
      bindkey '^ ' autosuggest-accept
    '';
  };
}
