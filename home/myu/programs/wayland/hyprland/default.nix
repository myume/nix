{
  wayland.windowManager.hyprland = {
    enable = true;
    systemd.enable = true;
    xwayland.enable = true;
    extraConfig = ''
      ${builtins.readFile ./config.conf}
    '';
  };
}
