{
  services.swayidle = let
    lock = "pidof hyprlock || hyprlock";
    display = status: "niri msg action power-${status}-monitors";
  in {
    enable = true;
    timeouts = [
      {
        timeout = 5 * 60;
        command = lock;
      }
      {
        timeout = 6 * 60;
        command = display "off";
      }
      {
        timeout = 15 * 60;
        command = "systemctl hibernate";
      }
    ];

    events = {
      before-sleep = (display "off") + "; " + lock;
      after-resume = display "on";
      lock = (display "off") + "; " + lock;
      unlock = display "on";
    };
  };
}
