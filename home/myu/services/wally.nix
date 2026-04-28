{inputs, ...}: {
  imports = [inputs.wally.homeManagerModules.default];
  services.wally = {
    enable = true;
    frequency = "hourly";
    defaultSource = "konachan";
    settings = {
      wallhaven = {
        categories = {
          general = false;
          people = false;
          anime = true;
        };
      };
      setCommand = [
        "awww img {{path}}"
        "awww img -n overview {{path}}"
      ];
    };
  };
}
