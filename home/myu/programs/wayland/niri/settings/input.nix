{
  programs.niri.settings.input = {
    disable-power-key-handling = true;
    keyboard = {
      xkb = {
        options = "caps:ctrl_modifier";
      };
    };
    touchpad = {
      tap = true;
      dwt = true;
      natural-scroll = false;
    };
    tablet = {
      map-to-output = "DP-2";
    };
  };
}
