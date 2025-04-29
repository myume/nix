{
  programs.git = {
    enable = true;
    userName = "myu";
    userEmail = "contact@memyu.com";
    extraConfig = {init.defaultBranch = "main";};
  };

  programs.ssh = {
    enable = true;
    matchBlocks = {
      "github.com" = {
        hostname = "github.com";
        user = "git";
        identityFile = "~/.ssh/id_ed25519";
      };
    };
  };
}
