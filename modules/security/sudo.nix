{lib, ...}: let
  inherit (lib.modules) mkForce;
in {
  security.sudo = {
    enable = true;
    execWheelOnly = mkForce true;
  };
}
