{
  programs.niri.settings = {
    layer-rules = [
      {
        matches = [
          {
            namespace = "^(bar|launcher|osd|popup)$";
          }
        ];

        background-effect = {
          blur = true;
          xray = false;
        };
      }
      {
        matches = [
          {
            namespace = "^awww-daemonoverview$";
          }
        ];
        place-within-backdrop = true;
        background-effect = {
          blur = true;
        };
      }
    ];

    window-rules = [
      {
        matches = [
          {
            app-id = "^kitty$";
          }
        ];
        background-effect = {
          blur = true;
        };
      }
      {
        draw-border-with-background = false;
        clip-to-geometry = true;
        geometry-corner-radius = let
          r = 16.0;
        in {
          top-left = r;
          top-right = r;
          bottom-left = r;
          bottom-right = r;
        };
      }
    ];
  };
}
