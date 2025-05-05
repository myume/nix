let
  wallpaperPath = ../../../../../modules/wallpapers;
  wallPaperFile = "purple.png";
in {
  programs.hyprlock = {
    enable = true;

    settings = {
      general = {
        hide_cursor = true;
      };

      auth = {
        # there's a delay on unlocking, probably due to async/scheduling issues
        fingerprint.enabled = true;
      };

      background = [
        {
          path = "${wallpaperPath}/${wallPaperFile}";
          blur_passes = 3;
        }
      ];

      image = [
        {
          path = "${wallpaperPath}/pfp/pink.jpg";
          size = "400";
          border_size = 0;
          roundig = -1;

          position = "0, 150";
          halign = "center";
          valign = "center";
        }
      ];

      label = [
        {
          text = "$USER";
          color = "rgba(ffffffee)";
          font_size = 36;
          font_family = "Noto Sans Bold";

          position = "0, -95";
          halign = "center";
          valign = "center";
        }
      ];

      input-field = [
        {
          size = "17%, 5%";
          outline_thickness = 0;

          inner_color = "rgba(30, 32, 48, 0.5)";
          check_color = "rgba(8bd5caee)";
          fail_color = "rgba(f38ba8ee)";
          font_color = "rgba(cad3f5ee)";

          fade_on_empty = false;
          rounding = -1;

          position = "0, -200";
          halign = "center";
          valign = "center";
        }
      ];
    };
  };
}
