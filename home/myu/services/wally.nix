{inputs, ...}: {
  imports = [inputs.wally.homeManagerModules.default];
  services.wally = {
    enable = true;
    config = "/home/myu/infinite/projects/wally/wally.kdl";
  };
}
