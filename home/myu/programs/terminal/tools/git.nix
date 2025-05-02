{
  programs.git = {
    enable = true;
    userName = "myu";
    userEmail = "contact@memyu.com";
    extraConfig = {init.defaultBranch = "main";};

    difftastic.enable = true;

    aliases = {
      lg = "log --color --graph --date=format:'%Y-%m-%d %H:%M:%S' --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%ad) %C(bold blue)<%an>%Creset'";
    };
  };
}
