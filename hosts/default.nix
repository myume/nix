{
  nixpkgs,
  home-manager,
  ...
} @ inputs: {
  navi = nixpkgs.lib.nixosSystem {
    system = "x86_64-linux";

    modules = [
      ./navi

      home-manager.nixosModules.home-manager
      {
        home-manager.useGlobalPkgs = true;
        home-manager.useUserPackages = true;

        home-manager.extraSpecialArgs = {inherit inputs;};
        home-manager.users = {
          myu = import ../home/myu/home.nix;
        };
      }
    ];
  };
}
