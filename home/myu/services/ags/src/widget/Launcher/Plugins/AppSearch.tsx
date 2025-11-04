import { Astal, Gdk, Gtk } from "ags/gtk4"
import AstalApps from "gi://AstalApps"
import Hyprland from "gi://AstalHyprland"
import { hideLauncher } from ".."
import { LauncherPlugin } from "./Plugin"
import { isHyprland, wrapIndex } from "../../../utils/util"
import Gio from "gi://Gio"
import { Accessor, createState, Setter, State, With } from "ags"
import { exec } from "ags/process"

const appItemHeight = 56

// didn't want to use the app.launch() method
// since it executes everything from the .config/ags dir
export const launchApp =
  (isHyprland: boolean) => (app: AstalApps.Application) => {
    const executable = app.executable.replace(/(%f|%F|%u|%U|%i|%c|%k)/g, "")
    // why are you launching cli programs from outside of a cli
    if ((app.app as Gio.DesktopAppInfo).get_boolean("Terminal")) {
      // Dear God, tinkle tinkle hoy! Please don't get injection attacked
      if (isHyprland) {
        Hyprland.get_default().dispatch("exec", `kitty -e ${executable}`)
      } else {
        exec([
          "niri",
          "msg",
          "action",
          "spawn-sh",
          "--",
          `kitty -e ${executable}`,
        ])
      }
    } else {
      if (isHyprland) {
        Hyprland.get_default().dispatch("exec", executable)
      } else {
        exec(["niri", "msg", "action", "spawn-sh", "--", executable])
      }
    }

    // since we're launching manually, we also need to manually increase this value
    app.set_frequency(app.frequency + 1)

    hideLauncher()
  }

const scrollToSelectedItem = (
  scrolledWindow: Gtk.ScrolledWindow,
  itemIndex: number,
  itemHeight: number,
) => {
  const vadjustment = scrolledWindow.get_vadjustment()
  const targetPosition = itemIndex * itemHeight

  // Get viewport information
  const pageSize = vadjustment.get_page_size()
  const currentValue = vadjustment.get_value()
  const maxValue = vadjustment.get_upper() - pageSize

  if (targetPosition < currentValue) {
    vadjustment.set_value(targetPosition)
  } else if (targetPosition + itemHeight > currentValue + pageSize) {
    const newValue = Math.min(targetPosition - pageSize + itemHeight, maxValue)
    vadjustment.set_value(newValue)
  }
}

const AppItem = ({
  selected: [selected, setSelected],
  app,
  index,
  isHyprland,
}: {
  selected: State<number>
  app: AstalApps.Application
  index: number
  isHyprland: boolean
}) => {
  const hasDescription =
    app.description !== null &&
    app.description !== undefined &&
    app.description !== ""

  return (
    <button
      heightRequest={appItemHeight}
      onClicked={() => {
        launchApp(isHyprland)(app)
      }}
      cssClasses={selected((selected) => {
        const classes = ["app-item"]
        if (selected === index) {
          classes.push("selected")
        }
        return classes
      })}
      hexpand
    >
      <box spacing={8}>
        <Gtk.EventControllerMotion onEnter={() => setSelected(index)} />
        <image pixelSize={36} iconName={app.iconName} />
        <box orientation={Gtk.Orientation.VERTICAL} heightRequest={40}>
          <label
            cssClasses={["app-title"]}
            label={app.name}
            xalign={0}
            heightRequest={!hasDescription ? 40 : -1}
          />
          <label
            cssClasses={["app-desc"]}
            visible={hasDescription}
            label={app.description}
            xalign={0}
          />
        </box>
      </box>
    </button>
  )
}

const AppSearchResults = ({
  searchResults,
  selected: [selected, setSelected],
  isHyprland,
}: {
  searchResults: Accessor<AstalApps.Application[]>
  selected: State<number>
  isHyprland: boolean
}) => {
  let scrollRef: Gtk.ScrolledWindow
  selected.subscribe(() => {
    scrollToSelectedItem(scrollRef, selected.get(), appItemHeight)
  })

  return (
    <Gtk.ScrolledWindow
      $={(self) => {
        scrollRef = self
      }}
      cssClasses={["app-results"]}
      heightRequest={400}
      maxContentHeight={400}
      hscrollbarPolicy={Gtk.PolicyType.NEVER}
      vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
      kineticScrolling
      overlayScrolling
      propagateNaturalHeight
    >
      <With value={searchResults}>
        {(results) =>
          results.length > 0 ? (
            <box orientation={Gtk.Orientation.VERTICAL} marginEnd={12}>
              {results.map((app, i) => (
                <AppItem
                  selected={[selected, setSelected]}
                  app={app}
                  index={i}
                  isHyprland={isHyprland}
                />
              ))}
            </box>
          ) : (
            <label hexpand vexpand label={"No Applications Found"} />
          )
        }
      </With>
    </Gtk.ScrolledWindow>
  )
}

export class AppSearch extends LauncherPlugin {
  static get_default(input: Accessor<string>): LauncherPlugin {
    if (!AppSearch.instance) AppSearch.instance = new AppSearch(input)
    return AppSearch.instance
  }

  static apps = new AstalApps.Apps()

  // doesn't work if not static for some reason
  selected: Accessor<number>
  setSelected: Setter<number>

  appSearchResults = this.input((str) => AppSearch.apps.fuzzy_query(str))

  iconName = "system-search"

  placeholderText = "Search"

  isHyprland = true

  constructor(input: Accessor<string>) {
    super(input)
    ;[this.selected, this.setSelected] = createState(0)
    this.appSearchResults.subscribe(() => this.setSelected(0))

    this.isHyprland = isHyprland()
  }

  activate(): void {
    launchApp(this.isHyprland)(this.appSearchResults.get()[this.selected.get()])
  }

  getWidget() {
    return (
      <AppSearchResults
        selected={[this.selected, this.setSelected]}
        searchResults={this.appSearchResults}
        isHyprland={this.isHyprland}
      />
    )
  }

  handleKeyPress(
    _self: Astal.Window,
    keyval: number,
    _keycode: number,
    state: Gdk.ModifierType,
  ): void {
    if (state === Gdk.ModifierType.CONTROL_MASK) {
      if (keyval === Gdk.KEY_p) {
        this.setSelected(
          wrapIndex(
            this.selected.get() - 1,
            this.appSearchResults.get().length,
          ),
        )
      }
      if (keyval === Gdk.KEY_n) {
        this.setSelected(
          wrapIndex(
            this.selected.get() + 1,
            this.appSearchResults.get().length,
          ),
        )
      }
    }
    if (keyval === Gdk.KEY_Up) {
      return this.setSelected(
        wrapIndex(this.selected.get() - 1, this.appSearchResults.get().length),
      )
    }

    if (keyval === Gdk.KEY_Down)
      return this.setSelected(
        wrapIndex(this.selected.get() + 1, this.appSearchResults.get().length),
      )
  }

  cleanup(): void {
    this.setSelected(0)
  }
}
