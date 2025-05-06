{
  programs.zsh.shellAliases = {
    rebuild = "sudo nixos-rebuild switch";
    gc = "sudo nix-collect-garbage -d";

    cat = "bat";
    grep = "rg";
  };
}
