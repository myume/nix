let
  wallpaperPath = ../../../../modules/wallpapers;
  wallPaperFile = "sky.jpg";
in {
  services.hyprpaper = {
    enable = true;

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
