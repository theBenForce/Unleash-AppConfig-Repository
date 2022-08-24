<h1 align="center">Welcome to unleash-appconfig-repository 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/unleash-appconfig-repository" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/unleash-appconfig-repository" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://github.com/theBenForce/Unleash-AppConfig-Repository/actions/workflows/release.yml" target="_blank">
    <img alt="Release Status" src="https://github.com/theBenForce/Unleash-AppConfig-Repository/actions/workflows/release.yml/badge.svg" />
  </a>
  <a href="https://twitter.com/theBenForce" target="_blank">
    <img alt="Twitter: theBenForce" src="https://img.shields.io/twitter/follow/theBenForce.svg?style=social" />
  </a>
</p>

> Use AWS AppConfig as a backend for Unleash feature flags

## Install

```sh
yarn install unleash-appconfig-repository
```

## Usage

There are two steps to using this plugin. First, you have to setup an AppConfig configuration. Next you need to
instantiate this plugin and pass it to unleash's `initialize` function.

### Create an AppConfig

The content of the configuration will be an Array of the type `FeatureInterface`. More details can
be found in the [unleash-client-node repository](https://github.com/Unleash/unleash-client-node/blob/5be66f60b03492af6f365003c78e2e7d74c597da/src/feature.ts#L6).

Here's an example config with one flag called "Test":

```json
[
  {
    "name": "Test",
    "enabled": true,
    "type": 'release',
    "impressionData": false,
    "stale": false,
    "variants": [],
    "strategies": [],
  },
]
```

### Use the Repository

To use this repository, you need to create an instance and pass it to Unleash
as [a custom repository](https://github.com/Unleash/unleash-client-node#custom-repository) during initialization.
The parameters for the repository come from the AppConfig Configuration that you created in the previous step.

> Note: this plugin will always pull the latest version of the configuration

```typescript
import { AppConfigRepository } from 'unleash-appconfig-repository';
import { initialize } from 'unleash-client';

const repo = new AppConfigRepository({
  // These values are used to request the configuration from AWS AppConfig
  applicaion: 'abc',
  environment: 'production',
  configuration: 'featureFlags',
  clientId: '123',
});

const client = initialize({
  appName: 'abc',
  url: 'not-required',
  repository: repo,
});
```

## Author

👤 **Ben Force**

* Website: https://thebenforce.com/
* Twitter: [@theBenForce](https://twitter.com/theBenForce)
* Github: [@theBenForce](https://github.com/theBenForce)
* LinkedIn: [@theBenForce](https://linkedin.com/in/theBenForce)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/theBenForce/Unleash-AppConfig-Repository/issues). 

## Show your support

Give a ⭐️ if this project helped you!

<a href="https://www.buymeacoffee.com/theBenForce" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-green.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
