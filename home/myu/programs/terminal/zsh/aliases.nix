{
  programs.zsh.shellAliases = {
    rebuild = "sudo nixos-rebuild switch";
    gc = "sudo nix-collect-garbage -d && nix-collect-garbage -d";

    cat = "bat";
    grep = "rg";
    tree = "eza -T";
    ff = "cd $(fd --type=d --hidden --exclude=.git | fzf)";

    "..." = "cd ../..";
    "...." = "cd ../../..";
    "....." = "cd ../../../..";
    "......" = "cd ../../../../..";
  };
}
