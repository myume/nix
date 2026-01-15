{
  config,
  lib,
  ...
}: {
  programs.niri.settings = {
    prefer-no-csd = true;

    hotkey-overlay = {
      skip-at-startup = true;
    };

    layout = {
      gaps = 10;
      struts = {
        top = -4;
      };
      always-center-single-column = true;

      focus-ring.enable = false;
      border = {
        enable = true;
        width = 2;
        active.color = "#89B4FA";
        inactive.color = "#313244";
      };
      # center-focused-column = "always";

      shadow.enable = true;

      preset-column-widths = [
        {proportion = 1.0 / 6.0;}
        {proportion = 1.0 / 4.0;}
        {proportion = 1.0 / 3.0;}
        {proportion = 1.0 / 2.0;}
        {proportion = 2.0 / 3.0;}
        {proportion = 3.0 / 4.0;}
        {proportion = 5.0 / 6.0;}
      ];
      default-column-width = {
        proportion = 1.0 / 2.0;
      };
    };

    overview = {
      backdrop-color = "#313244";
    };

    screenshot-path = "~/Pictures/Screenshots/%Y-%m-%dT%H:%M:%S.png";

    input = {
      touchpad = {
        natural-scroll = false;
        dwt = true;
      };

      keyboard = {
        xkb = {
          options = "caps:ctrl_modifier";
        };
      };
    };

    clipboard.disable-primary = true;

    gestures = {
      hot-corners.enable = false;
    };

    cursor = {
      theme = "Bibata-Original-Ice";
      size = 16;

      hide-after-inactive-ms = 1000;
    };

    binds = let
      workspaces = lib.attrsets.mergeAttrsList (lib.flatten (map (n: [
        {
          "Mod+${toString n}".action.focus-workspace = n;
          "Mod+Shift+${toString n}".action.move-column-to-workspace = n;
        }
      ]) (lib.lists.range 1 9)));

      transition = "niri msg action do-screen-transition --delay-ms 0";
    in
      with config.lib.niri.actions;
        lib.attrsets.mergeAttrsList [
          workspaces
          {
            "Mod+Return".action.spawn-sh = "kitty -1";
            "Mod+Space".action.spawn-sh = "${transition}; ags toggle launcher";
            "Mod+Shift+Slash".action = show-hotkey-overlay;

            "Mod+H".action = focus-column-or-monitor-left;
            "Mod+L".action = focus-column-or-monitor-right;
            "Mod+J".action = focus-window-or-workspace-down;
            "Mod+K".action = focus-window-or-workspace-up;

            "Alt+Shift+H".action = move-column-left-or-to-monitor-left;
            "Alt+Shift+L".action = move-column-right-or-to-monitor-right;
            "Alt+Shift+J".action = move-window-down-or-to-workspace-down;
            "Alt+Shift+K".action = move-window-up-or-to-workspace-up;

            "Ctrl+Shift+L".action = set-column-width "+10%";
            "Ctrl+Shift+H".action = set-column-width "-10%";
            "Ctrl+Shift+J".action = set-window-height "+10%";
            "Ctrl+Shift+K".action = set-window-height "-10%";
            "Mod+Tab".action = switch-preset-column-width;
            "Mod+Backslash".action = set-column-width "50%";

            "Mod+Ctrl+H".action = move-workspace-to-monitor-left;
            "Mod+Ctrl+L".action = move-workspace-to-monitor-right;
            "Mod+Ctrl+J".action = move-workspace-to-monitor-down;
            "Mod+Ctrl+K".action = move-workspace-to-monitor-up;

            "Mod+Q".action = close-window;

            "Mod+F".action = maximize-column;
            "Mod+Shift+F".action = fullscreen-window;

            "Mod+Escape".action = toggle-overview;
            # "Mod+O".action = toggle-overview;
            "Mod+Up".action = toggle-overview;

            "Mod+C".action = center-column;
            "Mod+Shift+C".action = center-visible-columns;

            "Mod+V".action = toggle-window-floating;
            "Mod+Shift+V".action = switch-focus-between-floating-and-tiling;

            "Mod+S".action = consume-window-into-column;
            "Mod+Shift+S".action = expel-window-from-column;

            "Mod+Shift+L".action.spawn = "hyprlock";
            "Mod+Ctrl+S".action.spawn-sh = "systemctl suspend";

            "Mod+Equal".action = expand-column-to-available-width;

            "Mod+P".action.screenshot = [];
            "Mod+Shift+P".action.screenshot-screen = [];
            "Mod+Ctrl+P".action.screenshot-window = [];

            "XF86AudioRaiseVolume".action = spawn-sh "wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%+ -l 1";
            "XF86AudioLowerVolume".action = spawn-sh "wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%- -l 1";
            "XF86AudioMute".action = spawn-sh "wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle";
            "XF86AudioPlay".action = spawn-sh "playerctl play-pause";
            "XF86AudioPrev".action = spawn-sh "playerctl previous";
            "XF86AudioNext".action = spawn-sh "playerctl next";

            "XF86MonBrightnessUp".action = spawn-sh "brightnessctl set 2%+";
            "XF86MonBrightnessDown".action = spawn-sh "brightnessctl set 2%-";
          }
        ];

    window-rules = [
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
