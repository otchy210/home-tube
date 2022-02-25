# HomeTube

![HomeTube](src/images/logo.svg)

English | [日本語](README.ja.md)

HomeTube is a webapp which provides YouTube-ish UI and features for your videos in your local storage and local network. Even though it's a "webapp", no one prepared it for you because it loads your local files. You should run your own instance on your machine.

## Install

CAUTION: HomeTube is still pretty early beta versoin. It's not recommended to try if you don't understand what the following commands do. You should consider which ones you _actually_ need to run and even you should consider any options to add.

Currently HomeTube is tested on Mac only. It may work on Linux but doesn't work on Windows certainly. (Supporting both Linux and Windows is on the TODO list)

```
$ brew install ffmpeg
$ brew install nvm
$ nvm install v14
$ nvm alias default 14
$ npm -g install @otchy/home-tube
$ home-tube
```

## Development

### Initial setup

```
$ git config --local core.hooksPath .githooks
```
