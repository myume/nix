let
  wallpaperPath = ../../../../../modules/wallpapers;
  wallPaperFile = "sky.jpg";
in {
  programs.hyprlock = {
    enable = true;

    settings = {
      general = {
        hide_cursor = true;
      };

      auth = {
        # there's a delay on unlocking, probably due to async/scheduling issues
        fingerprint.enabled = false;
      };

      background = [
        {
          path = "${wallpaperPath}/${wallPaperFile}";
          blur_passes = 3;
        }
      ];
    };
  };
}
