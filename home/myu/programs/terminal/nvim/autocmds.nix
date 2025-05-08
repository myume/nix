{lib, ...}: let
  inherit (lib.generators) mkLuaInline;
in {
  programs.nvf.settings.vim = {
    autocmds = [
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
        # group = "toggleAbsoluteNumbers";
        callback = mkLuaInline ''
          function() vim.opt.relativenumber = false end
        '';
        desc = "Toggle absolute numbers on insert";
      }
      {
        enable = true;
        event = ["InsertLeave"];
        # group = "toggleAbsoluteNumbers";
        callback = mkLuaInline ''
          function() vim.opt.relativenumber = true end
        '';
        desc = "Toggle relative numberes in normal mode";
      }
    ];
  };
}
