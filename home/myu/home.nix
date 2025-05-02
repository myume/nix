{
  imports = [
    ./packages
    ./programs
    ./services
    ./misc
  ];

  home = {
    username = "myu";
    homeDirectory = "/home/myu";

    stateVersion = "24.11";
  };

  programs.home-manager.enable = true;
}
