import { astalify, ConstructProps, Gtk } from "astal/gtk4";

export type ScrolledWindowProps = ConstructProps<
  Gtk.ScrolledWindow,
  Gtk.ScrolledWindow.ConstructorProps
>;
export const ScrolledWindow = astalify<
  Gtk.ScrolledWindow,
  Gtk.ScrolledWindow.ConstructorProps
>(Gtk.ScrolledWindow);
