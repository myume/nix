let
  wallpaperPath = toString ./wallpapers;
  wallPaperFile = "/sky/sky-girl.png";
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
