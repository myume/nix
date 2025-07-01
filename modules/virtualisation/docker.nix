{lib, ...}: {
  virtualisation.docker = {
    enable = true;
  };

  systemd.services.docker.wantedBy = lib.mkForce [];
}
