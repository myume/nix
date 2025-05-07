{
  programs.nvf.settings.vim = {
    diagnostics = {
      enable = true;
      nvim-lint.enable = true;
      config = {
        update_in_insert = true;
        virtual_text = true;
        severity_sort = true;

        # this is not working
        # signs = {
        #   text = {
        #     "vim.diagnostic.severity.ERROR" = "󰅚 ";
        #     "vim.diagnostic.severity.WARN" = "󰀪 ";
        #     "vim.diagnostic.severity.HINT" = " ";
        #     "vim.diagnostic.severity.INFO" = " ";
        #   };
        # };

        float = {
          focusable = false;
          style = "minimal";
          border = "rounded";
          source = "always";
        };
      };
    };
  };
}
