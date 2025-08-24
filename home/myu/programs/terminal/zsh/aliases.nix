{
  programs.zsh.shellAliases = {
    rebuild = "sudo nixos-rebuild switch";
    gc = "sudo nix-collect-garbage -d && nix-collect-garbage -d";

    cat = "bat";
    grep = "rg";
    tree = "eza -T";

    "..." = "cd ../..";
    "...." = "cd ../../..";
    "....." = "cd ../../../..";
    "......" = "cd ../../../../..";
  };
}
