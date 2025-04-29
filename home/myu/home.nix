{
  imports = [
    ./packages
    ./programs
    ./services
  ];

  home = {
    username = "myu";
    homeDirectory = "/home/myu";

    stateVersion = "24.11";
  };

  programs.home-manager.enable = true;
}
