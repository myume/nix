{
  lib,
  config,
  ...
}: {
  programs.ciri.settings.binds = let
    workspaces = lib.flatten (map (n: [
      {
        key = "Mod+${toString n}";
        action.focus-workspace = n;
      }
      {
        key = "Mod+Shift+${toString n}";
        action.move-column-to-workspace.args = [n];
      }
    ]) (lib.lists.range 1 9));

    launcher =
      if config.layer-shell.ags.enable
      then "ags toggle launcher"
      else "quickshell ipc call launcher toggle";
  in
    workspaces
    ++ [
      {
        key = "Mod+Return";
        action.spawn-sh = "kitty -1";
      }
      {
        key = "Mod+Space";
        action.spawn-sh = launcher;
      }

      {
        key = "Mod+H";
        action.focus-column-or-monitor-left = true;
      }
      {
        key = "Mod+L";
        action.focus-column-or-monitor-right = true;
      }
      {
        key = "Mod+K";
        action.focus-window-or-workspace-up = true;
      }
      {
        key = "Mod+J";
        action.focus-window-or-workspace-down = true;
      }

      {
        key = "Alt+Shift+H";
        action.move-column-left-or-to-monitor-left = true;
      }
      {
        key = "Alt+Shift+L";
        action.move-column-right-or-to-monitor-right = true;
      }
      {
        key = "Alt+Shift+K";
        action.move-window-up-or-to-workspace-up = true;
      }
      {
        key = "Alt+Shift+J";
        action.move-window-down-or-to-workspace-down = true;
      }

      {
        key = "Ctrl+Shift+H";
        action.set-column-width = "+10%";
      }
      {
        key = "Ctrl+Shift+L";
        action.set-column-width = "-10%";
      }
      {
        key = "Ctrl+Shift+K";
        action.set-window-height = "+10%";
      }
      {
        key = "Ctrl+Shift+J";
        action.set-window-height = "-10%";
      }
      {
        key = "Mod+Backslash";
        action.set-column-width = "50%";
      }
      {
        key = "Mod+Tab";
        action.switch-preset-column-width = true;
      }

      {
        key = "Mod+Ctrl+H";
        action.move-workspace-to-monitor-left = true;
      }
      {
        key = "Mod+Ctrl+L";
        action.move-workspace-to-monitor-right = true;
      }
      {
        key = "Mod+Ctrl+K";
        action.move-workspace-to-monitor-up = true;
      }
      {
        key = "Mod+Ctrl+J";
        action.move-workspace-to-monitor-down = true;
      }

      {
        key = "Mod+Q";
        action.close-window = true;
      }
      {
        key = "Mod+F";
        action.maximize-column = true;
      }
      {
        key = "Mod+Shift+F";
        action.fullscreen-window = true;
      }
      {
        key = "Mod+Escape";
        action.toggle-overview = true;
      }

      {
        key = "Mod+C";
        action.center-column = true;
      }
      {
        key = "Mod+Shift+C";
        action.center-visible-columns = true;
      }

      {
        key = "Mod+V";
        action.toggle-window-floating = true;
      }
      {
        key = "Mod+Shift+V";
        action.switch-focus-between-floating-and-tiling = true;
      }

      {
        key = "Mod+S";
        action.consume-window-into-column = true;
      }
      {
        key = "Mod+Shift+S";
        action.expel-window-from-column = true;
      }

      {
        key = "Mod+Shift+L";
        action.spawn-sh = "hyprlock";
      }
      {
        key = "Mod+Ctrl+S";
        action.spawn-sh = "systemctl suspend";
      }

      {
        key = "Mod+Equal";
        action.expand-column-to-available-width = true;
      }

      {
        key = "Mod+P";
        action.screenshot = {};
      }
      {
        key = "Mod+Shift+P";
        action.screenshot-screen = {};
      }
      {
        key = "Mod+Ctrl+P";
        action.screenshot-window = {};
      }

      {
        key = "XF86AudioRaiseVolume";
        action.spawn-sh = "wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%+ -l 1";
      }
      {
        key = "XF86AudioLowerVolume";
        action.spawn-sh = "wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%- -l 1";
      }
      {
        key = "XF86AudioMute";
        action.spawn-sh = "wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle";
      }
      {
        key = "XF86AudioPlay";
        action.spawn-sh = "playerctl play-pause";
      }
      {
        key = "XF86AudioPrev";
        action.spawn-sh = "playerctl previous";
      }
      {
        key = "XF86AudioNext";
        action.spawn-sh = "playerctl next";
      }

      {
        key = "XF86MonBrightnessUp";
        action.spawn-sh = "brightnessctl set 2%+";
      }
      {
        key = "XF86MonBrightnessDown";
        action.spawn-sh = "brightnessctl set 2%-";
      }
    ];
}
