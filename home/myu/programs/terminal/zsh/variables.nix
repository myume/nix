{
  programs.zsh = {
    sessionVariables = {
      MANPAGER = "nvim -c 'set ft=man' +Man! -o -";
      ZVM_VI_INSERT_ESCAPE_BINDKEY = "kj";
      ZVM_VI_HIGHLIGHT_BACKGROUND = "#A6ADC8";
      ZVM_VI_HIGHLIGHT_FOREGROUND = "#1E1E2E";
      ZVM_VI_HIGHLIGHT_EXTRASTYLE = "bold";
      ZVM_INSERT_MODE_CURSOR = "$ZVM_CURSOR_BLINKING_BEAM";
    };
  };
}
