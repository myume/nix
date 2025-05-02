{pkgs, ...}: {
  programs.bat = {
    enable = true;

    config = {
      theme = "catppuccinMocha";
      pager = "never"; # if i wanted paging i'd just open it in vim
      plain = true;
    };

    themes = {
      catppuccinMocha = {
        src = pkgs.fetchFromGitHub {
          owner = "catppuccin";
          repo = "bat";
          rev = "699f60fc8ec434574ca7451b444b880430319941";
          sha256 = "6fWoCH90IGumAMc4buLRWL0N61op+AuMNN9CAR9/OdI=";
        };
        file = "/themes/Catppuccin Mocha.tmTheme";
      };
    };
  };
}
