{
  programs.git = {
    enable = true;
    settings = {
      aliases = {
        lg = "log --color --graph --date=format:'%Y-%m-%d %H:%M:%S' --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%ad) %C(bold blue)<%an>%Creset'";
      };
      user = {
        name = "myu";
        email = "contact@memyu.com";
      };
      init.defaultBranch = "main";
    };
  };

  programs.difftastic.enable = true;
}
