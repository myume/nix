let
  dirContents = builtins.readDir ./.;
  dirsWithDefault = builtins.filter (
    name:
      dirContents.${name}
      == "directory"
      && builtins.pathExists (./. + "/${name}/default.nix")
  ) (builtins.attrNames dirContents);
in {
  imports = map (name: ./. + "/${name}") dirsWithDefault;
}
