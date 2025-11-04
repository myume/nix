import { createBinding, createComputed } from "ags"
import { Gtk } from "ags/gtk4"
import { exec } from "ags/process"
import AstalMpris from "gi://AstalMpris"

export function toTitleCase(str: string): string {
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}

const extractAppFromDbusName = (busName: string) =>
  busName.match(/org\.mpris\.MediaPlayer2\.([^.]+)/)?.[1]

export const getAppName = (player: AstalMpris.Player) =>
  createComputed(
    [createBinding(player, "busName"), createBinding(player, "entry")],
    (busName, entry) =>
      entry ?? extractAppFromDbusName(busName) ?? "audio-volume-high",
  )

export const hideOnClickAway =
  (hide: () => void) => (self: Gtk.Window, x: number, y: number) => {
    const allocation = (self.get_child()! as Gtk.Box).get_allocation()

    if (
      x < allocation.x ||
      x > allocation.x + allocation.width ||
      y < allocation.y ||
      y > allocation.y + allocation.height
    ) {
      hide()
    }
  }

export function formatDuration(length: number) {
  const totalSeconds = Math.floor(length)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  } else {
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }
}

export const secondsToTimeStamp = (seconds: number) => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)

  if (h === 0) {
    return `${m}m`
  }

  return `${h}h ${m}m`
}

export const wrapIndex = (index: number, length: number) =>
  ((index % length) + length) % length

export const isHyprland = () => {
  try {
    return !exec(["hyprctl", "version"]).includes(
      "HYPRLAND_INSTANCE_SIGNATURE not set!",
    )
  } catch {
    return false
  }
}
