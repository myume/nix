{
  services.hypridle = {
    enable = true;

    settings = {
      general = {
        lock_cmd = "pidof hyprlock || hyprlock";
        after_sleep_cmd = "hyprctl dispatch dpms on";
        before_sleep_cmd = "loginctl lock-session";
        ignore_dbus_inhibit = false;
      };

      listener = [
        {
          timeout = 5 * 60;
          on-timeout = "loginctl lock-session";
        }

        {
          timeout = 10 * 60;
          on-timeout = "hyprctl dispatch dpms off"; # screen off when timeout has passed
          on-resume = "hyprctl dispatch dpms on"; # screen on when activity is detected after timeout has fired.
        }

        {
          timeout = 15 * 60;
          on-timeout = "systemctl suspend"; # suspend pc
        }
      ];
    };
  };
}
