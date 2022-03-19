# HomeTube

![HomeTube](src/images/logo.svg)

English | [日本語](README.ja.md)

HomeTube is a webapp which provides YouTube-ish UI and features for your videos in your local storage and local network. Even though it's a "webapp", no one prepared it for you because it loads your local files. You should run your own instance on your machine.

## Install

**CAUTION:** HomeTube is still pretty early beta versoin. It's not recommended to try if you don't understand what this introduction explains exactly.

### Requirements

-   `ffmpeg` v4 or later
    -   HomeTube uses `ffmpeg` command to handle videos. So you need to install it on the server you want to run the HomeTube.
-   Node.js v12 or later (v14 is recommended)
    -   HomeTube uses `node` command to run the server.

### List of commands you may want to run on your Mac

Followings are _examples_ of commands on Mac. You should consider which ones you actually need to run and even you should consider any options to add.
Currently HomeTube is tested on Mac and Linux. It doesn't work on Windows certainly. (Supporting Windows is on the TODO list)

```
$ brew install ffmpeg
$ brew install nvm
$ nvm install v14
$ nvm alias default 14
$ npm -g install @otchy/home-tube
$ home-tube
```

(Assuming Linux users can understand what to do by above 😉)

## Development

### Initial setup

```
$ git config --local core.hooksPath .githooks
```
