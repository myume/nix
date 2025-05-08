{
  wayland.windowManager.hyprland.settings = {
    animations = {
      enabled = true; # duh
      first_launch_animation = true;

      bezier = [
        "smoothOut, 0.36, 0, 0.66, -0.56"
        "smoothIn, 0.25, 1, 0.5, 1"
        "overshot, 0.4,0.8,0.2,1.2"
      ];

      animation = [
        "windows, 1, 4, smoothIn, slide"
        "windowsOut, 1, 4, smoothOut, slide"
        "border,1,10,default"

        "fade, 1, 10, smoothIn"
        "fadeDim, 1, 10, smoothIn"
        "workspaces, 1, 6, smoothIn" # ", slidevert"
      ];
    };
  };
}
