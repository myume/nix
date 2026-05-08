{
  programs.ciri.settings.layout = {
    gaps = 10.0;
    struts = {
      top = -4;
    };

    always-center-single-column = true;
    focus-ring.off = true;

    border = {
      width = 2.0;
      active-color = "#89B4FA";
      inactive-color = "#313244";
    };

    shadow = {
      on = true;
    };

    preset-column-widths = [
      {proportion = 1.0 / 6.0;}
      {proportion = 1.0 / 4.0;}
      {proportion = 1.0 / 3.0;}
      {proportion = 1.0 / 2.0;}
      {proportion = 2.0 / 3.0;}
      {proportion = 3.0 / 4.0;}
      {proportion = 5.0 / 6.0;}
    ];

    default-column-width = {
      proportion = 1.0 / 2.0;
    };
  };
}
