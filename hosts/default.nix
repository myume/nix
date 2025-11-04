{
  nixpkgs,
  home-manager,
  nixos-hardware,
  ...
} @ inputs: {
  makima = let
    hostname = "makima";
  in
    nixpkgs.lib.nixosSystem {
      specialArgs = {
        inherit hostname;
        inherit inputs;
      };

      modules = [
        (./. + "/${hostname}")

        home-manager.nixosModules.home-manager
        {
          home-manager = {
            useGlobalPkgs = true;
            useUserPackages = true;

            extraSpecialArgs = {
              inherit inputs;
            };
            users = {
              myu = import ../home/myu/home.nix;
            };
          };
        }
      ];
    };
}
