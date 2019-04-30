# rx-workshop-1

### Requirements

- Node 6.5.0
- Chrome 55+

### Setup

After you've cloned or copied the repository, run an npm install:

```
npm i
```

You need to install two things globally:

1. ts-node - to run our typescript files in node
2. typescript - ;) of course

To install these: 

```
npm i -g ts-node typescript
```

### Exercises

Exercises can be found under the `exercises/` directory. The `exercises-final/` directory has finished versions of the exercises.

### Running Exercises

In console just run ts-node like so:

```
ts-node exercises/node/1-subscribe-with-callbacks.ts
```g

### Demo Server

Some of the exercises (the ones found under `exercises/browser/` require a server to run them
because of either permissions, requiring an HTTP backend or requiring a WebSocket connection. To run
the demo server just run

```
npm run start
```
