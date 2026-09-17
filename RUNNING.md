# Running this project

How to get AR Organ Explorer running on an Android emulator after a fresh
machine restart (or a clean checkout). This is a bare React Native CLI
project — there is no Expo Go shortcut.

## Prerequisites (one-time, already set up on this machine)

- Node.js >= 22.11 (`node -v`)
- Android SDK with `platform-tools` and an emulator image installed
  (`ANDROID_HOME` / `ANDROID_SDK_ROOT` set, `adb` and `emulator` on PATH)
- A JDK on PATH (Microsoft build of OpenJDK 21 is what this project builds with)
- An AVD already created (e.g. `Pixel6_API36` — check with `emulator -list-avds`)

## Every-time steps

### 1. Start the emulator (if not already running)

```bash
emulator -avd Pixel6_API36
adb devices          # confirm it shows up as "device", not "offline"
```

### 2. Install JS dependencies (skip if `node_modules/` is already populated)

```bash
npm install
```

If you ever see `Cannot find module '...react-native/cli.js'` when starting
Metro, it means `node_modules` is incomplete/corrupt — rerun `npm install`.

### 3. Start Metro

```bash
npm start
# equivalent to: npx react-native start --port 8081
```

Leave this running in its own terminal. **Do not `curl` or otherwise poke
`/index.bundle` manually while the app is also loading** — concurrent
requests to the same bundle endpoint fight over the same worker pool and
make everything look like it's hung/restarting. Let the app be the only
client.

### 4. Forward Metro's port to the emulator

Only needed if you build/install via Gradle directly instead of
`npm run android` (the RN CLI normally does this for you automatically):

```bash
adb reverse tcp:8081 tcp:8081
```

### 5. Build and install the debug APK

Preferred (does the port-forward and install for you):

```bash
npm run android
# equivalent to: react-native run-android
```

If that fails to resolve `gradlew.bat` on PATH (a known quirk on Windows
Git Bash), fall back to calling Gradle directly:

```bash
cd android
./gradlew.bat app:installDebug -PreactNativeDevServerPort=8081
cd ..
```

### 6. Launch the app

`npm run android` launches it automatically. To relaunch without
rebuilding:

```bash
adb shell am start -n com.arorganexplorer/.MainActivity
```

Use `am start`, not `monkey`, to relaunch — `monkey` redelivers an intent
to an already-running (possibly broken) instance instead of giving you a
fresh JS context.

## Known gotchas (hit these already, fixed for good — but if history repeats)

- **First bundle build is slow.** Metro has to crawl and transform the
  entire dependency graph from scratch with no cache. This project's
  `metro.config.js` already excludes `android/build`, `android/app/build`,
  `android/app/.cxx` and `android/.gradle` from Metro's watcher/crawler —
  without that exclusion, Metro re-stats tens of thousands of native build
  files on every request and effectively never finishes. Don't remove that
  `resolver.blockList` entry.
- **Stale absolute paths after moving/cloning the repo to a different
  drive letter or path.** If Gradle fails with something like
  `Configuring project ':x' without an existing directory ... 'D:\old\path\...'`,
  delete the generated caches and let Gradle regenerate them — they are
  build output, not source:
  ```bash
  rm -rf android/build android/app/build android/app/.cxx
  ```
- **A single corrupted incremental-build cache after an interrupted
  build** (killed daemon, disk full, etc.) can cascade into confusing
  unrelated errors (missing generated Kotlin classes, codegen rename
  failures). If a module's build starts failing with "cannot find symbol"
  or "unresolved reference" for something that should be generated code,
  clean just that module and retry:
  ```bash
  rm -rf node_modules/<package>/android/build
  ```
- **Gradle daemon getting killed between commands** shows up as `Gradle
  build daemon has been stopped: stop command received` or "daemon
  disappeared". Run `cd android && ./gradlew.bat --stop`, then retry. Add
  `--no-daemon` to the Gradle command if it keeps happening.
- **App shows a blank white screen** with `isMetroRunning(): Async result
  = true` in `adb logcat` but nothing after that: the emulator can't reach
  Metro. Run `adb reverse tcp:8081 tcp:8081` and relaunch the app.

## Everyday development loop

Once the app is installed once, you don't need to reinstall for JS-only
changes — Metro serves the updated bundle and Fast Refresh picks it up.
Only rerun `npm run android` when you change native code, add a native
dependency, or edit anything under `android/`.

## Checks before committing

```bash
npx tsc --noEmit
npx eslint .
npx jest
```
