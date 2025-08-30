let
  # binds $mod + [shift +] {1..9} to [move to] workspace {1..9}
  workspaces = builtins.concatLists (builtins.genList (
      i: let
        ws = i + 1;
      in [
        "$mod, code:1${toString i}, workspace, ${toString ws}"
        "$mod SHIFT, code:1${toString i}, movetoworkspace, ${toString ws}"
      ]
    )
    9);
in {
  wayland.windowManager.hyprland.settings = {
    "$mod" = "SUPER";
    binds = {
      movefocus_cycles_fullscreen = true;
    };

    bind =
      [
        "$mod, return, exec, kitty -1"
        "SUPER_SHIFT, Q, exit,"
        "$mod, V, togglefloating,"
        "$mod, space, exec, ags toggle launcher"

        # Window Navigation
        "$mod, H, movefocus, l"
        "$mod, L, movefocus, r"
        "$mod, K, movefocus, u"
        "$mod, J, movefocus, d"
        "$mod, tab, cyclenext"

        # Window Arrangement
        "ALT_SHIFT, H, movewindow, l"
        "ALT_SHIFT, L, movewindow, r"
        "ALT_SHIFT, J, movewindow, d"
        "ALT_SHIFT, K, movewindow, u"

        # Preselect direction
        "SUPER_SHIFT, A, layoutmsg, preselect l"
        "SUPER_SHIFT, D, layoutmsg, preselect r"
        "SUPER_SHIFT, W, layoutmsg, preselect u"
        "SUPER_SHIFT, S, layoutmsg, preselect d"

        # Window Management
        "$mod, Q, killactive,"
        "$mod, P, pseudo"
        "$mod, S, togglesplit"

        # Toggle fullscreen
        "SUPER_SHIFT, F, fullscreen, 0"
        "$mod, F, fullscreen, 1"

        "CONTROL_SUPER, L, exec, hyprlock"

        # Screenshots
        "SUPER_SHIFT, P, exec, hyprshot -m region -o ~/Pictures/Screenshots"
        "CONTROL_SUPER_SHIFT, P, exec, hyprshot -m output -o ~/Pictures/Screenshots"
      ]
      ++ workspaces;

    bindm = [
      # Move/resize windows with mainMod + LMB/RMB and dragging
      "$mod, mouse:272, movewindow"
      "$mod, mouse:273, resizewindow"
    ];

    binde = [
      # Window Size
      "CONTROL_SHIFT, H, resizeactive, -50 0"
      "CONTROL_SHIFT, L, resizeactive, 50 0"
      "CONTROL_SHIFT, J, resizeactive, 0 5"
      "CONTROL_SHIFT, K, resizeactive, 0 -5"

      # Volume control
      ", XF86AudioRaiseVolume, exec, wpctl set-volume -l 1.0 @DEFAULT_AUDIO_SINK@ 5%+"
      ", XF86AudioLowerVolume, exec, wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%-"
    ];

    bindl = [
      "CONTROL_SUPER, S, exec, systemctl suspend"

      ",XF86AudioPlay,exec,playerctl play-pause"
      ",XF86AudioPrev,exec,playerctl previous"
      ",XF86AudioNext,exec,playerctl next"

      ", XF86AudioMute, exec, wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle"
    ];

    bindle = [
      ", XF86MonBrightnessDown, exec, brightnessctl -q set 2%-"
      ", XF86MonBrightnessUp, exec, brightnessctl -q set +2%"
    ];
  };
}
