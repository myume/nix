{pkgs, ...}: let
  getDirs = "${pkgs.fd}/bin/fd --type=d --hidden --exclude=.git";
  getFiles = "${pkgs.fd}/bin/fd --type=f --hidden --exclude=.git";
in {
  programs.fzf = {
    enable = true;
    enableZshIntegration = false;

    defaultCommand = getFiles;

    defaultOptions = [
      "--preview='if [[ -d {} ]]; then eza -T --icons=always --color=always {} ; else bat --color=always {} ; fi'"
      "--preview-window=right:60%:hidden"
      "--preview-border=left"
      "--border=none"
      "--layout=reverse"
      "--bind=alt-p:toggle-preview,alt-a:select-all"
      "--bind=change:first"
      "--bind='alt-f:reload(${getFiles})'"
      "--bind='alt-t:reload(${getDirs})'"
      "--multi"
      "--info=inline-right"

      "--ansi"
      "--prompt='❯ '"
    ];

    colors = {
      "preview-bg" = "-1";
      "gutter" = "#313244";
      "bg" = "-1";
      "bg+" = "-1";
      "hl" = "#F38BA8";
      "hl+" = "#F38BA8";
      "spinner" = "#F5E0DC";
      "fg" = "#CDD6F4";
      "header" = "#F38BA8";
      "info" = "#CBA6F7";
      "pointer" = "#F5E0DC";
      "marker" = "#B4BEFE";
      "fg+" = "#CDD6F4";
      "prompt" = "#89B4FA";
      "border" = "#6C7086";
      "label" = "#CDD6F4";
    };
  };
}
