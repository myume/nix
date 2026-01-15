{
  wayland.windowManager.hyprland.settings = {
    layerrule = [
      "match:namespace top-bar, blur on"
      "match:namespace top-bar, ignore_alpha .3"

      "match:namespace floating-notifications, blur on"
      "match:namespace floating-notifications, ignore_alpha .3"

      "match:namespace launcher, blur on"
      "match:namespace launcher, ignore_alpha .3"

      "match:namespace center-menu, blur on"
      "match:namespace center-menu, ignore_alpha .3"

      "match:namespace control-panel, blur on"
      "match:namespace control-panel, ignore_alpha .3"

      "match:namespace OSD, blur on"
      "match:namespace OSD, ignore_alpha .3"
    ];

    workspace = [
    ];

    windowrulev2 = [
      # why is it impossible for anyone to get idle inhibit right
      "idleinhibit focus, class:^(mpv)$"
      "idleinhibit fullscreen, class:^(zen|zen-twilight)$"

      # apparently the order matters and this needs to be second
      "idleinhibit focus, class:^(zen|zen-twilight)$, title:^(.*YouTube.*)$"

      "float, title:^(Media viewer)$"

      "float, title:^(Save File|Open.*|Choose.*|Select.*)$"
    ];
  };
}
