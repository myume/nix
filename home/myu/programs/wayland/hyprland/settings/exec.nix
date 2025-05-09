let
  cursorName = "Bibata-Original-Ice";
in {
  wayland.windowManager.hyprland.settings = {
    exec-once = [
      "hyprlock --immediate-render --no-fade-in"
      "hyprctl setcursor ${cursorName} ${toString 16}"
    ];
  };
}
