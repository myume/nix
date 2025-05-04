{
  programs.zsh.shellAliases = {
    rebuild = "sudo nixos-rebuild switch";
    cleanup = "sudo nix-collect-garbage --delete-older-than 3d && sudo nix-collect-garbage -d";

    cat = "bat";
    grep = "rg";
  };
}
