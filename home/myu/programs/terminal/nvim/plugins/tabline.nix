{lib, ...}: let
  inherit (lib.generators) mkLuaInline;
in {
  programs.nvf.settings.vim = {
    tabline.nvimBufferline = {
      enable = true;

      setupOpts = {
        highlights =
          mkLuaInline
          ''
            (function()
                local integration = require("catppuccin.groups.integrations.bufferline")
                return (integration.get_theme or integration.get)({
                  custom = {
                    all = {
                      indicator_visible = {fg = "#74c7ec"},
                      indicator_selected = {fg = "#74c7ec"},
                    }
                  }
            })
            end)()
          '';
        options = {
          numbers = "none";
          indicator.style = "icon";
        };
      };

      mappings = {
        closeCurrent = "<C-A-d>";
        cyclePrevious = "<C-A-h>";
        cycleNext = "<C-A-l>";
        movePrevious = "<C-A-j>";
        moveNext = "<C-A-k>";
      };
    };
  };
}
