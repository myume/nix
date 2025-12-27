let
  wallpaperPath = ../../../../modules/wallpapers;
  wallPaperFile = "purple.jpg";
in {
  services.hyprpaper = {
    enable = false;

    settings = {
      ipc = "off";
      splash = false;

      preload = [
        "${wallpaperPath}/${wallPaperFile}"
      ];

      wallpaper = [
        ",${wallpaperPath}/${wallPaperFile}"
      ];
    };
  };
}
