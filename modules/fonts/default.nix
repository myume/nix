{pkgs, ...}: {
  fonts = {
    packages = with pkgs; [
      nerd-fonts.fira-code

      noto-fonts
      noto-fonts-cjk-sans

      inter

      (callPackage ./product-sans/package.nix {})
    ];

    fontDir.enable = true;
  };
}
