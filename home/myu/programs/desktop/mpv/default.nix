{pkgs, ...}: {
  programs.mpv = {
    enable = true;
    config = {
      osc = "no";
      border = "no";
    };
    scripts = [pkgs.mpvScripts.modernx-zydezu];
    scriptOpts = {
      modernx = {
        scale_windowed = 1.5;
        scale_fullscreen = 1.5;
        scale_forced_window = 1.5;
      };
    };
  };
}
