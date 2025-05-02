{
  services = {
    # Enable fingerprint reader support
    fprintd = {
      enable = true;
    };
  };

  security.pam.services = {
    login.fprintAuth = true;
    hyprlock.fprintAuth = true;
  };
}
