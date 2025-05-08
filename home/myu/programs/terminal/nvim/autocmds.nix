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

      {
        enable = true;
        event = ["DirChanged"];
        callback = mkLuaInline ''
          function(args)
            local current_dir = vim.fn.getcwd()
            local display_path = current_dir

            -- Check if we're in a git repository
            local is_git_repo = vim.fn.system("git rev-parse --is-inside-work-tree 2>/dev/null") == "true\n"

            if is_git_repo then
              -- Get git root directory
              local git_root = vim.fn.system("git rev-parse --show-toplevel 2>/dev/null"):gsub("\n", "")
              local repo_name = vim.fn.fnamemodify(git_root, ":t")

              -- Calculate relative path
              if current_dir == git_root then
                display_path = "[" .. repo_name .. "]/"
              else
                -- Remove git root from current dir to get relative path
                local relative_path = string.sub(current_dir, string.len(git_root) + 1)
                display_path = "[" .. repo_name .. "]" .. relative_path
              end
            end

            Snacks.notify.info("Directory changed to: " .. display_path, { title = "Dir Changed" })
          end
        '';
        desc = "Notify on dir change";
      }
    ];
  };
}
