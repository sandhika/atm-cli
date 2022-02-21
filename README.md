ATM-CLI
=================

Command Line Interface (CLI) to simulate an interaction of an ATM with a retail bank

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ cd atm-cli

$ npm install -g atm-cli
or
$ npm install -g .


$ atm-cli COMMAND
running command...
$ atm-cli (--version)
atm-cli/0.0.1 linux-x64 node-v14.15.0
$ atm-cli --help [COMMAND]
USAGE
  $ atm-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`atm-cli deposit [AMOUNT]`](#atm-cli-deposit-amount)
* [`atm-cli help [COMMAND]`](#atm-cli-help-command)
* [`atm-cli login NAME`](#atm-cli-login-name)
* [`atm-cli logout [FILE]`](#atm-cli-logout-file)
* [`atm-cli plugins`](#atm-cli-plugins)
* [`atm-cli plugins:inspect PLUGIN...`](#atm-cli-pluginsinspect-plugin)
* [`atm-cli plugins:install PLUGIN...`](#atm-cli-pluginsinstall-plugin)
* [`atm-cli plugins:link PLUGIN`](#atm-cli-pluginslink-plugin)
* [`atm-cli plugins:uninstall PLUGIN...`](#atm-cli-pluginsuninstall-plugin)
* [`atm-cli plugins update`](#atm-cli-plugins-update)
* [`atm-cli status [NAME]`](#atm-cli-status-name)
* [`atm-cli transfer [TARGET] [AMOUNT]`](#atm-cli-transfer-target-amount)
* [`atm-cli withdraw [AMOUNT]`](#atm-cli-withdraw-amount)

## `atm-cli deposit [AMOUNT]`

`deposit [amount]` - Deposits this amount to the logged in customer

```
USAGE
  $ atm-cli deposit [AMOUNT]

DESCRIPTION
  `deposit [amount]` - Deposits this amount to the logged in customer
```

_See code: [dist/commands/deposit.ts](https://github.com/sandhika/atm-cli/blob/v0.0.1/dist/commands/deposit.ts)_

## `atm-cli help [COMMAND]`

Display help for atm-cli.

```
USAGE
  $ atm-cli help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for atm-cli.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.11/src/commands/help.ts)_

## `atm-cli login NAME`

`login [name]` - Logs in as this customer and creates the customer if not exist

```
USAGE
  $ atm-cli login [NAME] [-f <value>]

ARGUMENTS
  NAME  Customer name for login

FLAGS
  -f, --from=<value>  Whom is saying hello

DESCRIPTION
  `login [name]` - Logs in as this customer and creates the customer if not exist
```

_See code: [dist/commands/login.ts](https://github.com/sandhika/atm-cli/blob/v0.0.1/dist/commands/login.ts)_

## `atm-cli logout [FILE]`

Logs out of the current customer

```
USAGE
  $ atm-cli logout [FILE]

DESCRIPTION
  Logs out of the current customer
```

_See code: [dist/commands/logout.ts](https://github.com/sandhika/atm-cli/blob/v0.0.1/dist/commands/logout.ts)_

## `atm-cli plugins`

List installed plugins.

```
USAGE
  $ atm-cli plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ atm-cli plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.0/src/commands/plugins/index.ts)_

## `atm-cli plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ atm-cli plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ atm-cli plugins:inspect myplugin
```

## `atm-cli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ atm-cli plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ atm-cli plugins add

EXAMPLES
  $ atm-cli plugins:install myplugin

  $ atm-cli plugins:install https://github.com/someuser/someplugin

  $ atm-cli plugins:install someuser/someplugin
```

## `atm-cli plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ atm-cli plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ atm-cli plugins:link myplugin
```

## `atm-cli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ atm-cli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ atm-cli plugins unlink
  $ atm-cli plugins remove
```

## `atm-cli plugins update`

Update installed plugins.

```
USAGE
  $ atm-cli plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `atm-cli status [NAME]`

describe the command here

```
USAGE
  $ atm-cli status [NAME]

DESCRIPTION
  describe the command here
```

_See code: [dist/commands/status.ts](https://github.com/sandhika/atm-cli/blob/v0.0.1/dist/commands/status.ts)_

## `atm-cli transfer [TARGET] [AMOUNT]`

`transfer [target] [amount]` - Transfers this amount from the logged in customer to the target customer

```
USAGE
  $ atm-cli transfer [TARGET] [AMOUNT]

DESCRIPTION
  `transfer [target] [amount]` - Transfers this amount from the logged in customer to the target customer
```

_See code: [dist/commands/transfer.ts](https://github.com/sandhika/atm-cli/blob/v0.0.1/dist/commands/transfer.ts)_

## `atm-cli withdraw [AMOUNT]`

`withdraw [amount]` - Withdraws this amount from the logged in customer

```
USAGE
  $ atm-cli withdraw [AMOUNT]

DESCRIPTION
  `withdraw [amount]` - Withdraws this amount from the logged in customer
```

_See code: [dist/commands/withdraw.ts](https://github.com/sandhika/atm-cli/blob/v0.0.1/dist/commands/withdraw.ts)_
<!-- commandsstop -->
* [`atm-cli login`](#atm-cli-login)
* [`atm-cli logout`](#atm-cli-logout)
* [`atm-cli status`](#atm-cli-status)
* [`atm-cli deposit`](#atm-cli-deposit)
* [`atm-cli withdraw`](#atm-cli-withdraw)
* [`atm-cli transfer`](#atm-cli-transfer)
## `atm-cli login`

$ login Alice

Hello, [NAME]!
Your balance is $[amount]

```
USAGE
  $ atm-cli login [NAME]

ARGUMENTS
  NAME  Person name for login

DESCRIPTION
  Logs in as this customer and creates the customer if not exist

EXAMPLES
  $ atm-cli login Alice
  Hello, Alice!
  Your balance is $0
```
## `atm-cli logout`

$ logout

Goodbye, [NAME]!

```
USAGE
  $ atm-cli logout

ARGUMENTS
  -

DESCRIPTION
  Logs in as this customer and creates the customer if not exist

EXAMPLES
  $ atm-cli logout
  Goodbye, Alice!
```

## `atm-cli deposit`

$ deposit [amount]

Your balance is $[amount]

```
USAGE
  $ atm-cli deposit [amount]

ARGUMENTS
  AMOUNT

DESCRIPTION
  Deposits this amount to the logged in customer

EXAMPLES
  $ atm-cli deposit 80
  Your balance is $80
```

## `atm-cli withdraw`

$ withdraw [amount]

Your balance is $[amount]

```
USAGE
  $ atm-cli withdraw [amount]

ARGUMENTS
  AMOUNT

DESCRIPTION
  Withdraws this amount from the logged in customer

EXAMPLES
  $ atm-cli withdraw 80
  Your balance is $0
```

## `atm-cli transfer`

$ transfer [amount] [name]

Transferred $[amount] to [amount]
Hello, [amount]!
your balance is $[amount]

```
USAGE
  $ atm-cli withdraw [amount]

ARGUMENTS
  AMOUNT  value for transfer
  NAME    name of customer for transfer

DESCRIPTION
  Transfers this amount from the logged in customer to the target customer

EXAMPLES
  $ atm-cli transfer 80 Alice
  Transferred $50 to Alice
  Hello, Alice!
  your balance is $30
```


## `atm-cli help [COMMAND]`

Display help for atm-cli.

```
USAGE
  $ atm-cli help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for atm-cli.
```
