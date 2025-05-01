{
  programs.starship = {
    enable = true;

    settings = {
      palette = "catppuccin";
      palettes = {
        catppuccin = {
          sky = "#89dceb";
          sapphire = "#74c7ec";
        };
      };

      battery.disabled = true;

      cmd_duration = {
        format = "[$duration]($style) ";
      };

      directory = {
        style = "bold bright-blue";
        read_only = "";
        truncation_length = 8;
      };

      git_branch = {
        format = "[$symbol$branch(:$remote_branch)]($style) ";
        symbol = " ";
        style = "bright-cyan";
      };
      git_status = {
        style = "sky";
        ahead = "⇡";
        behind = "⇣";
        conflicted = " ";
        renamed = "»";
        deleted = "✘";
        diverged = "⇆";
        modified = "!";
        stashed = "≡";
        staged = "+";
        untracked = "?";
      };

      lua.symbol = "[ ](blue)";
      python.symbol = "[ ](blue)";
      rust.symbol = "[ ](red)";
      nix_shell.symbol = "[󱄅 ](blue)";
      golang.symbol = "[󰟓 ](blue)";
      c.symbol = "[ ](black)";
      cpp = {
        disabled = false;
        symbol = "[ ](black)";
      };
      nodejs.symbol = "[󰎙 ](yellow)";
    };
  };
}
