{
  programs.nvf.settings.vim.keymaps = [
    {
      key = "kj";
      mode = "i";
      action = "<ESC>";
      desc = "Exit insert mode";
    }

    # navigation
    {
      key = "<C-d>";
      mode = "n";
      action = "<C-d>zz";
      desc = "Scroll down half a screen and center cursor";
    }
    {
      key = "<C-u>";
      mode = "n";
      action = "<C-u>zz";
      desc = "Scroll up half a screen and center cursor";
    }
    {
      key = "<A-n>";
      mode = "n";
      action = "G";
      desc = "Go to end of file";
    }
    {
      key = "<A-p>";
      mode = "n";
      action = "gg";
      desc = "Go to start of file";
    }
    {
      key = "H";
      mode = "n";
      action = "^";
      desc = "Go to start of line";
    }
    {
      key = "L";
      mode = "n";
      action = "$";
      desc = "Go to end of line";
    }

    # split nav
    {
      key = "<C-j>";
      mode = "n";
      action = "<C-W><C-j>";
      desc = "Move to split below";
    }
    {
      key = "<C-k>";
      mode = "n";
      action = "<C-W><C-k>";
      desc = "Move to split above";
    }
    {
      key = "<C-l>";
      mode = "n";
      action = "<C-W><C-l>";
      desc = "Move to split on the right";
    }
    {
      key = "<C-h>";
      mode = "n";
      action = "<C-W><C-h>";
      desc = "Move to split on the left";
    }
    {
      key = "<C-w><C-L>";
      mode = "n";
      action = ":vertical res -5<CR>";
      desc = "Decrease vertical split width by 5";
    }
    {
      key = "<C-w><C-H>";
      mode = "n";
      action = ":vertical res +5<CR>";
      desc = "Increase vertical split width by 5";
    }
    {
      key = "<C-w><C-K>";
      mode = "n";
      action = ":res -5<CR>";
      desc = "Decrease horizontal split height by 5";
    }
    {
      key = "<C-w><C-J>";
      mode = "n";
      action = ":res +5<CR>";
      desc = "Increase horizontal split height by 5";
    }
    {
      key = "<A-w>l";
      mode = "n";
      action = "<A-w>r";
      desc = "Rotate split right";
    }
    {
      key = "<A-w>h";
      mode = "n";
      action = "<A-w>R";
      desc = "Rotate split left";
    }
    {
      key = "<A-w>e";
      mode = "n";
      action = "<A-w>x";
      desc = "Exchange splits";
    }

    # buffer nav
    {
      key = "<C-A-h>";
      mode = "n";
      action = ":bp<CR>";
      desc = "Go to previous buffer";
    }
    {
      key = "<C-A-l>";
      mode = "n";
      action = ":bn<CR>";
      desc = "Go to next buffer";
    }
    {
      key = "<C-A-d>";
      mode = "n";
      action = ":bd<CR>";
      desc = "Delete current buffer";
    }

    # yanking
    {
      key = "<space>/";
      mode = "n";
      action = ":noh<CR>";
      desc = "Clear search highlight";
    }
    {
      key = "<leader>d";
      mode = "n";
      action = "\"_d";
      desc = "Delete without yanking in normal mode";
    }
    {
      key = "<leader>d";
      mode = "v";
      action = "\"_d";
      desc = "Delete without yanking in visual mode";
    }
    {
      key = "<leader>p";
      mode = "v";
      action = "\"_dP";
      desc = "Paste without yanking in visual mode";
    }
    {
      key = "<leader>y";
      mode = "n";
      action = "\"+y";
      desc = "Yank to clipboard in normal mode";
    }
    {
      key = "<leader>y";
      mode = "v";
      action = "\"+y";
      desc = "Yank to clipboard in visual mode";
    }
  ];
}
