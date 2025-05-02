{
  programs.eza = {
    enable = true;
    enableZshIntegration = true;

    git = true;
    icons = "always";
    colors = "always";
    extraOptions = ["--group-directories-first" "--header"];
  };
}
