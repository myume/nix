{
  inputs,
  config,
  ...
}: {
  imports = [inputs.waysted.homeManagerModules.default];

  services.waysted = {
    enable = true;
    compositor =
      if config.compositor.niri.enable
      then "niri"
      else "hyprland";
  };
}
