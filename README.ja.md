# HomeTube

![HomeTube](resources/svg/logo.svg)

[English](README.md) | 日本語

HomeTube はローカルストレージやローカルネットワーク上にある動画に対して、YouTube っぽい機能を提供するウェブアプリです。「ウェブアプリ」といっても、ローカルのファイルを読み込む必要があるので、あらかじめ用意されたサーバがあるわけではありません。自分自身でローカルにサーバを立てて利用して下さい。

## インストール

**警告:** HomeTube はまだ超初期の β バージョンです。この説明が何を言っているか正確に理解できない場合はインストールをお勧めしません。

### 要件

-   `ffmpeg` v4 以降
    -   HomeTube は動画を扱うために `ffmpeg` コマンドを使用します。HomeTube を走らせるサーバ上にこれをインストールしておく必要があります。
-   Node.js v12 以降 (v14 が推奨)
    -   HomeTube は `node` コマンドを使用してサーバを走らせます。

### Mac 上で走らせるとよいかも知れないコマンドのリスト

以下は Mac 上のコマンドの「例」です。どのコマンドが自分の環境で実際に必要なのかを検討する必要がありますし、必要に応じてコマンドにオプションを追加する必要もあるでしょう。
現在のところ HomeTube は Mac と Linux 上でテストされています。Windows では確実に動きません。(Windows をサポートする計画はあります。)

```
$ brew install ffmpeg
$ brew install nvm
$ nvm install v14
$ nvm alias default 14
$ npm -g install @otchy/home-tube
$ home-tube
```

(Linux ユーザの皆さんが何をすべきかは上記から理解してくれると信じてます 😉)

## 開発

### 初期設定

```
$ git config --local core.hooksPath .githooks
```
