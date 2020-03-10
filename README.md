# Payday Demo for Go Fore

This application is a React Native demo made as a recruitement task for Gofore Oyj.

The original specifications are to import a .csv file of employee hours and to generate the payroll as some kind of text output.

This basic functionality should be in place, and then a little bit extra also. =)

## Installation

Run `npm install` in the project directory.

## Running the app

To build for both iOS and Android, you must have Xcode and Android Studio installed as well as their respective command-line tools and libraries (CocoaPods, Java) configured correctly, then from the project directory:

1. iOS

`npx react-native run-ios`

2. Android:

In the `/android` directory of the project create a local config file `local.properties` with an item pointing to your Android sdk, ie. like this on macOS:
```
sdk.dir=/Users/<username>/Library/Android/sdk
```
And Windows...
```
sdk.dir = C:\\Users\\USERNAME\\AppData\\Local\\Android\\sdk
```
Make sure to configure an emulator through the Android Device Manager (ADM) or to connect an Android device via USB and enable USB debugging, then run the app:

`npx react-native run-android`

This has been tested with Q, that is Android API 29.

### Profit!