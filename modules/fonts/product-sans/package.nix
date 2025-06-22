{
  stdenvNoCC,
  lib,
  fetchFromGitHub,
}:
stdenvNoCC.mkDerivation {
  pname = "google-sans";
  version = "2024-10-03";

  src = fetchFromGitHub {
    owner = "massimo-rnd";
    repo = "Google-Sans-Font";
    rev = "main";
    sha256 = "sha256-eK7pZSDc3a+8ScdG2Z12MRSIIAusLHQqZllNyPIEpC8=";
  };

  installPhase = ''
    mkdir -p $out/share/fonts/truetype/
    find . -name "*.ttf" -exec cp {} $out/share/fonts/truetype/ \;
    find . -name "*.otf" -exec cp {} $out/share/fonts/truetype/ \;
  '';

  meta = with lib; {
    description = "Google Sans (Product Sans) Font Pack";
    homepage = "https://github.com/massimo-rnd/Google-Sans-Font";
    platforms = platforms.all;
  };
}
