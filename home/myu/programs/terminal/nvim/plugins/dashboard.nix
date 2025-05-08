let
  cultureText = "I don't know everything, I just know what I know.";
in {
  programs.nvf.settings.vim = {
    utility = {
      snacks-nvim.setupOpts = {
        dashboard = {
          enable = true;
          sections = [
            {section = "header";}
            {
              icon = " ";
              title = "Keymaps";
              section = "keys";
              indent = 2;
              padding = 1;
            }
            {
              icon = " ";
              title = "Recent Files";
              section = "recent_files";
              indent = 2;
              padding = 1;
            }
            {
              icon = " ";
              title = "Projects";
              section = "projects";
              indent = 2;
              padding = 1;
            }
            {
              padding = [0 2];
              footer = cultureText;
            }
          ];
        };
      };
    };
  };
}
