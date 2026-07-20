{pkgs, ...}: {
  services.swayidle = let
    lock = "${pkgs.hyprlock}/bin/hyprlock";
    display = status: "${pkgs.niri}/bin/niri msg action power-${status}-monitors";
  in {
    enable = false;
    timeouts = [
      {
        timeout = 5 * 60;
        command = lock;
      }
      {
        timeout = 6 * 60;
        command = display "off";
        resumeCommand = display "on";
      }
      {
        timeout = 10 * 60;
        command = "${pkgs.systemd}/bin/systemctl suspend-then-hibernate";
      }
    ];

    events = {
      before-sleep = lock;
      after-resume = display "on";
      inherit lock;
      unlock = display "on";
    };
  };
}
