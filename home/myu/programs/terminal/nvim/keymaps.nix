{
  programs.nvf.settings.vim.keymaps = [
    {
      key = "kj";
      mode = ["i"];
      action = "<ESC>";
      desc = "Exit insert mode";
    }

    # navigation
    {
      key = "<C-d>";
      mode = ["n" "v"];
      action = "<C-d>zz";
      desc = "Scroll down half a screen and center cursor";
    }
    {
      key = "<C-u>";
      mode = ["n" "v"];
      action = "<C-u>zz";
      desc = "Scroll up half a screen and center cursor";
    }
    {
      key = "<A-n>";
      mode = ["n" "v"];
      action = "G";
      desc = "Go to end of file";
    }
    {
      key = "<A-p>";
      mode = ["n" "v"];
      action = "gg";
      desc = "Go to start of file";
    }
    {
      key = "H";
      mode = ["n" "v"];
      action = "^";
      desc = "Go to start of line";
    }
    {
      key = "L";
      mode = ["n" "v"];
      action = "$";
      desc = "Go to end of line";
    }

    # split nav
    {
      key = "<C-j>";
      mode = ["n"];
      action = "<C-W><C-j>";
      desc = "Move to split below";
    }
    {
      key = "<C-k>";
      mode = ["n"];
      action = "<C-W><C-k>";
      desc = "Move to split above";
    }
    {
      key = "<C-l>";
      mode = ["n"];
      action = "<C-W><C-l>";
      desc = "Move to split on the right";
    }
    {
      key = "<C-h>";
      mode = ["n"];
      action = "<C-W><C-h>";
      desc = "Move to split on the left";
    }
    {
      key = "<C-w><C-L>";
      mode = ["n"];
      action = ":vertical res -5<CR>";
      desc = "Decrease vertical split width by 5";
    }
    {
      key = "<C-w><C-H>";
      mode = ["n"];
      action = ":vertical res +5<CR>";
      desc = "Increase vertical split width by 5";
    }
    {
      key = "<C-w><C-K>";
      mode = ["n"];
      action = ":res -5<CR>";
      desc = "Decrease horizontal split height by 5";
    }
    {
      key = "<C-w><C-J>";
      mode = ["n"];
      action = ":res +5<CR>";
      desc = "Increase horizontal split height by 5";
    }
    {
      key = "<A-w>l";
      mode = ["n"];
      action = "<A-w>r";
      desc = "Rotate split right";
    }
    {
      key = "<A-w>h";
      mode = ["n"];
      action = "<A-w>R";
      desc = "Rotate split left";
    }
    {
      key = "<A-w>e";
      mode = ["n"];
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
      mode = ["n"];
      action = ":noh<CR>";
      desc = "Clear search highlight";
    }
    {
      key = "<leader>d";
      mode = ["n" "v"];
      action = "\"_d";
      desc = "Delete without yanking";
    }
    {
      key = "<leader>p";
      mode = ["v"];
      action = "\"_dP";
      desc = "Paste without yanking";
    }
    {
      key = "<leader>y";
      mode = ["n" "v"];
      action = "\"+y";
      desc = "Yank to clipboard in normal mode";
    }
  ];
}
