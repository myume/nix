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

    windowrule = [
      # why is it impossible for anyone to get idle inhibit right
      "idle_inhibit match:focus, match:class ^(mpv)$"
      "idle_inhibit match:fullscreen, match:class ^(zen|zen-twilight)$"

      # apparently the order matters and this needs to be second
      "idle_inhibit focus, match:class ^(zen|zen-twilight)$, match:title ^(.*YouTube.*)$"

      "float on, match:title ^(Media viewer)$"

      "float on, match:title ^(Save File|Open.*|Choose.*|Select.*)$"
    ];
  };
}
