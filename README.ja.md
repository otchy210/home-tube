# HomeTube

![HomeTube](src/images/logo.svg)

[English](README.md) | 日本語

HomeTube はローカルストレージやローカルネットワーク上にある動画に対して、YouTube っぽい機能を提供するウェブアプリです。「ウェブアプリ」といっても、ローカルのファイルを読み込む必要があるので、あらかじめ用意されたサーバがあるわけではありません。自分自身でローカルにサーバを立てて利用して下さい。

## インストール

警告: HomeTube はまだ超初期の β バージョンです。下記のコマンドが何をするためのものか理解できない場合はインストールをお勧めしません。どのコマンドが自分の環境で実際に必要なのかを検討する必要がありますし、必要に応じてコマンドにオプションを追加する必要もあるでしょう。

現在のところ HomeTube は Mac 上でだけテストされています。Linux 上ではもしかしたら動くかもしれませんが、Windows では確実に動きません。(Linux と Windows の両方をサポートする計画はあります。)

```
$ brew install ffmpeg
$ brew install nvm
$ nvm install v14
$ nvm alias default 14
$ npm -g install @otchy/home-tube
$ home-tube
```

## 開発

### 初期設定

```
$ git config --local core.hooksPath .githooks
```
