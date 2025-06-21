{
  programs.fastfetch = {
    enable = true;
    settings = {
      # copied from this since i was too lazy to actually figure out how to do it myself
      # https://github.com/LierB/fastfetch

      # i'll throw a picture of an anime girl here eventually...
      # logo = {
      #   source = "~/Pictures";
      #   type = "kitty";
      #   height = 20;
      #   padding = {
      #     top = 1;
      #   };
      # };

      display = {
        separator = " ";
      };

      modules = [
        "title"
        "separator"

        {
          type = "os";
          key = " OS ";
          keyColor = "31";
        }
        {
          type = "kernel";
          key = " ├  ";
          keyColor = "31";
        }
        {
          type = "uptime";
          key = " ├  ";
          format = "{?1}{1}d {?}{2}h {3}m";
          keyColor = "31";
        }
        {
          type = "packages";
          key = " ├ 󰏖 ";
          keyColor = "31";
        }
        {
          type = "shell";
          key = " └  ";
          keyColor = "31";
        }

        "break"

        {
          type = "wm";
          key = " WM ";
          keyColor = "32";
        }
        {
          type = "wmtheme";
          key = " ├ 󰉼 ";
          keyColor = "32";
        }
        {
          type = "icons";
          key = " ├ 󰀻 ";
          keyColor = "32";
        }
        {
          type = "cursor";
          key = " ├ 󰇀 ";
          keyColor = "32";
        }
        {
          type = "terminal";
          key = " ├  ";
          keyColor = "32";
        }
        {
          type = "terminalfont";
          key = " └  ";
          keyColor = "32";
        }

        "break"

        {
          type = "host";
          format = "{5} {1} Type {2}";
          key = "󰇄 PC ";
          keyColor = "33";
        }
        {
          type = "cpu";
          format = "{1} ({3}) @ {7} GHz";
          key = " ├  ";
          keyColor = "33";
        }
        {
          type = "gpu";
          format = "{1} {2} @ {12} GHz";
          key = " ├ 󰢮 ";
          keyColor = "33";
        }
        {
          type = "memory";
          key = " ├  ";
          keyColor = "33";
        }
        {
          type = "disk";
          key = " ├ 󰋊 ";
          keyColor = "33";
        }
        {
          type = "monitor";
          key = " └ 󰍹 ";
          keyColor = "33";
        }

        "break"
        {
          type = "colors";
          symbol = "circle";
        }
      ];
    };
  };
}
