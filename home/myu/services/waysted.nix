{inputs, ...}: {
  imports = [inputs.waysted.homeManagerModules.default];

  services.waysted = {
    enable = true;
  };
}
