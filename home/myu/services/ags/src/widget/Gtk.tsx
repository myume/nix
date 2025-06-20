import { astalify, ConstructProps, Gtk } from "astal/gtk4";

export type ScrolledWindowProps = ConstructProps<
  Gtk.ScrolledWindow,
  Gtk.ScrolledWindow.ConstructorProps
>;
export const ScrolledWindow = astalify<
  Gtk.ScrolledWindow,
  Gtk.ScrolledWindow.ConstructorProps
>(Gtk.ScrolledWindow);

export const Overlay = astalify<Gtk.Overlay>(Gtk.Overlay);

export const PasswordEntry = astalify<
  Gtk.PasswordEntry,
  Gtk.PasswordEntry.ConstructorProps
>(Gtk.PasswordEntry);
