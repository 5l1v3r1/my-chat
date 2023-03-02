# my-chat

> 💬 A chat app using WS

## Install

```
% npm install
% npm install -g wscat
```

## Usage

```
% node index.js
WebSocket server is listening on port 1337
```

```
% wscat -c ws://localhost:1337
Connected (press CTRL+C to quit)
< Welcome, user115!
> Hello, world!
< user197: What's up, Morpheus...
> Nothing much \o/
< user197 has disconnected
> 
```

## Preview

Join and chat on `ws://lucid-dreams.ddns.net:1337` when available.