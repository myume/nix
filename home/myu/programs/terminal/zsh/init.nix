{
  programs.zsh.initContent = ''
    bindkey "^ " autosuggest-accept
    bindkey "^H" backward-kill-word

    function zvm_after_lazy_keybindings() {
      bindkey -M vicmd "L" end-of-line
      bindkey -M vicmd "H" beginning-of-line
      bindkey -M vicmd "dd" kill-whole-line
    }

    precmd() {
      precmd() {
        echo
      }
    }
  '';
}
