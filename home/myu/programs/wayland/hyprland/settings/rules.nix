{
  wayland.windowManager.hyprland.settings = {
    layerrule = [
      "blur ,top-bar"
      "ignorealpha .3, top-bar"

      "blur ,floating-notifications"
      "ignorealpha .3, floating-notifications"

      "blur ,launcher"
      "ignorealpha .3, launcher"

      "blur ,center-menu"
      "ignorealpha .3, center-menu"

      "blur ,control-panel"
      "ignorealpha .3, control-panel"

      "blur ,OSD"
      "ignorealpha .3, OSD"
    ];

    workspace = [
    ];

    windowrulev2 = [
      # why is it impossible for anyone to get idle inhibit right
      "idleinhibit focus, class:^(mpv)$"
      "idleinhibit fullscreen, class:^(zen|zen-twilight)$"

      # apparently the order matters and this needs to be second
      "idleinhibit focus, class:^(zen|zen-twilight)$, title:^(.*YouTube.*)$"
    ];
  };
}
