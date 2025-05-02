{
  programs.nvf.settings.vim = {
    dashboard.dashboard-nvim = {
      enable = true;
      setupOpts = {
        theme = "hyper";
        config = {
          week_header.enable = true;
          packages.enable = false;
          shortcut = [];
          footer = [
            ""
            ""
            "I don't know everything, I just know what I know."
          ];
        };
      };
    };
  };
}
