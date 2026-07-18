{
  boot.kernelParams = ["resume_offset=110895104"];
  boot.resumeDevice = "/dev/disk/by-uuid/ee05835a-574e-482c-bedd-2846705ab407";

  powerManagement.enable = true;

  services.logind.settings.Login = {
    HandleLidSwitch = "suspend-then-hibernate";
    HandlePowerKey = "hibernate";
  };

  swapDevices = [
    # for hibernation
    {
      device = "/var/lib/swapfile";
      size = 64 * 1024;
    }
  ];

  systemd.sleep.settings.Sleep = {
    HibernateDelaySec = "30m";
    SuspendState = "mem";
  };
}
