{
  imports = [
    ./aliases.nix
    ./init.nix
    ./plugins.nix
    ./variables.nix
  ];

  programs.zsh = {
    enable = true;

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

    profileExtra = ''
      if [ -z "''${WAYLAND_DISPLAY}" ] && [ "''${XDG_VTNR}" -eq 1 ]; then
          exec dbus-run-session Hyprland
      fi
    '';
  };
}
