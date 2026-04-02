{
  pkgs,
  config,
  ...
}: let
  browser = ["zen-twilight.desktop"];
  fileManager = ["thunar.desktop"];

  associations = {
    "text/html" = browser;
    "x-scheme-handler/http" = browser;
    "x-scheme-handler/https" = browser;
    "x-scheme-handler/ftp" = browser;
    "x-scheme-handler/about" = browser;
    "x-scheme-handler/unknown" = browser;
    "application/xhtml+xml" = browser;
    "application/x-extension-htm" = browser;
    "application/x-extension-html" = browser;
    "application/x-extension-shtml" = browser;
    "application/x-extension-xhtml" = browser;
    "application/x-extension-xht" = browser;
    "inode/directory" = fileManager;

    "audio/*" = ["mpv.desktop"];
    "video/*" = ["mpv.desktop"];

    "image/*" = browser;
    "image/gif" = browser;
    "image/jpeg" = browser;
    "image/png" = browser;
    "image/svg" = browser;
    "image/webp" = browser;
    "application/json" = browser;
    "application/pdf" = browser;

    "x-scheme-handler/spotify" = ["spotify.desktop"];
    "x-scheme-handler/discord" = ["discord.desktop"];
    "x-scheme-handler/mailto" = browser;

    "x-terminal-emulator" = ["kitty.desktop"];

    "application/x-bittorrent" = ["org.qbittorrent.qBittorrent.desktop"];
  };
in {
  xdg = {
    enable = true;
    userDirs = {
      enable = true;
      createDirectories = true;
      setSessionVariables = false;
      extraConfig = {
        SCREENSHOTS = "${config.xdg.userDirs.pictures}/Screenshots";
      };
    };

    portal = {
      enable = true;

      extraPortals = [
        pkgs.xdg-desktop-portal-gnome
        pkgs.xdg-desktop-portal-gtk
      ];

      config.common = {
        default = ["gnome" "gtk"];
        "org.freedesktop.impl.portal.FileChooser" = ["gtk"];
        "org.freedesktop.impl.portal.Access" = ["gtk"];
        "org.freedesktop.impl.portal.Secret" = ["gnome-keyring"];
      };
    };

    mimeApps = {
      enable = true;
      associations.added = associations;
      defaultApplications = associations;
    };
  };
}
