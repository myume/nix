{
  imports = [./symbols.nix];

  programs.starship = {
    enable = true;
    enableZshIntegration = true;

    settings = {
      # this inserts a newline before every prompt, even in an empty terminal.
      add_newline = false;

      palette = "catppuccin";
      palettes = {
        catppuccin = {
          sky = "#89dceb";
          sapphire = "#74c7ec";
          lavendar = "#b4befe";
        };
      };

      battery.disabled = true;

      cmd_duration = {
        format = "[$duration]($style) ";
      };

      directory = {
        style = "bold blue";
        truncation_length = 8;
      };

      git_branch = {
        format = "[$symbol$branch(:$remote_branch)]($style)";
        style = "bold sapphire";
      };
      git_status = {
        style = "bold sky";
        format = "[$all_status]($style)[( $ahead_behind)]($style) ";
        ahead = "↑";
        behind = "↓";
        conflicted = " ";
        renamed = "»";
        deleted = "✘";
        diverged = "⇄";
        modified = "*";
        stashed = "≡";
        staged = "+";
        untracked = "?";
      };
    };
  };
}
