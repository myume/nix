{
  services.hypridle = let
    display = status: "niri msg action power-${status}-monitors";
  in {
    enable = true;

    settings = {
      general = {
        lock_cmd = "pidof hyprlock || hyprlock";
        after_sleep_cmd = display "on";
        before_sleep_cmd = "loginctl lock-session";
        ignore_dbus_inhibit = false;
      };

      listener = [
        {
          timeout = 5 * 60;
          on-timeout = "loginctl lock-session";
        }

        {
          timeout = 6 * 60;
          on-timeout = display "off";
          on-resume = display "on";
        }

        {
          timeout = 10 * 60;
          on-timeout = "systemctl suspend-then-hibernate";
        }
      ];
    };
  };
}
