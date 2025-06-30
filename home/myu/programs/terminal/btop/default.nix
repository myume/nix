{pkgs, ...}: let
  catppuccin-btop = pkgs.fetchFromGitHub {
    owner = "catppuccin";
    repo = "btop";
    rev = "main";
    sha256 = "sha256-mEGZwScVPWGu+Vbtddc/sJ+mNdD2kKienGZVUcTSl+c=";
  };

  themeName = "catppuccin_mocha";
in {
  programs.btop = {
    enable = true;
    settings = {
      color_theme = themeName;
    };
  };

  home.file.".config/btop/themes/${themeName}.theme".source = "${catppuccin-btop}/themes/${themeName}.theme";
}
