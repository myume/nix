{lib, ...}: let
  inherit (lib.generators) mkLuaInline;
in {
  programs.nvf.settings.vim = {
    autocmds = [
      {
        enable = true;
        event = ["QuitPre"];
        callback = mkLuaInline ''
          function()
            local invalid_win = {}
            local wins = vim.api.nvim_list_wins()
            for _, w in ipairs(wins) do
              local bufname = vim.api.nvim_buf_get_name(vim.api.nvim_win_get_buf(w))
              if bufname:match("NvimTree_") ~= nil then
                table.insert(invalid_win, w)
              end
            end
            if #invalid_win == #wins - 1 then
              -- Should quit, so we close all invalid windows.
              for _, w in ipairs(invalid_win) do vim.api.nvim_win_close(w, true) end
            end
          end
        '';
        desc = "Close NvimTree when last window";
      }
      {
        enable = true;
        event = ["TextYankPost"];
        callback = mkLuaInline ''
          function()
            vim.highlight.on_yank({ higroup = "IncSearch", timeout = 100 })
          end
        '';
        desc = "Highlight on yank";
      }
      {
        enable = true;
        event = ["InsertEnter"];
        callback = mkLuaInline ''
          function() vim.opt.relativenumber = false end
        '';
        desc = "Toggle absolute numbers on insert";
      }
      {
        enable = true;
        event = ["InsertLeave"];
        callback = mkLuaInline ''
          function() vim.opt.relativenumber = true end
        '';
        desc = "Toggle relative numberes in normal mode";
      }
    ];
  };
}
