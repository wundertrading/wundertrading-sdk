# WunderTrading SDK
WunderTrading SDK for Open API (https://wundertrading.com/docs) 

## Installation

```shell
npm install "@wundertrading/wundertrading-sdk"
```

## Simple example
```javascript
const {wbt} = require("@wundertrading/wundertrading-sdk");

// client instance
const client = new wbt(
    "API_KEY",
    "SECRET_KEY"
);

// get first page live strategies
client.getStrategiesLive().then((result) => console.log(result));
```
[All examples](#examples)

## Client Configuration Options

The `@wundertrading/wundertrading-sdk` client can be configured with the following options:

| Name        | Type     | Required | Description                                      |
|-------------|----------|----------|--------------------------------------------------|
| `apiKey`    | `string` | true     | Your WunderTrading account API key value.        |
| `apiSecret` | `string` | true     | Your WunderTrading account API Secret key value. |
| `config`    | `object` | false    | Additional configurations                        |

### Client `config` options

The `@wundertrading/wundertrading-sdk` client `config` can be configured with the following options:

| Name               | Type      | Required | Default                     | Description                                                                 |
|--------------------|-----------|----------|-----------------------------|-----------------------------------------------------------------------------|
| `recvWindow`       | `number`  | false    | 60000                       | Maximum allowed request age in ms.                                          |
| `baseURL`          | `string`  | false    | "https://wundertrading.com" | API service domain.                                                         |
| `proxy`            | `object`  | false    | false                       | [Axios `proxy` request config](https://axios-http.com/docs/req_config)      |
| `httpsAgent`       | `object`  | false    | undefined                   | [Axios `httpsAgent` request config](https://axios-http.com/docs/req_config) |
| `validateRequests` | `boolean` | false    | true                        | Validate requests data before sending to WunderTrading or not               |

## Examples

### Fetch supported exchanges

```javascript
const {wbt, constants} = require("@wundertrading/wundertrading-sdk");

// client instance
const client = new wbt(
    "API_KEY",
    "SECRET_KEY"
);

async function example() {
    const exchanges = await client.getExchanges();
    console.log(exchanges);
}

example();
```

### Fetch supported markets (for `Binance Futures USDT-M`)

```javascript
const {wbt, constants} = require("@wundertrading/wundertrading-sdk");

// client instance
const client = new wbt(
    "API_KEY",
    "SECRET_KEY"
);

async function example() {
    const markets = await client.getMarkets({
      exchanges: ["BINANCE_FUTURES"]
    });
    console.log(markets);
}

example();
```

### Fetch `active` `Binance Futures USDT-M` API profiles
* find first 2 active API profiles

```javascript
const {wbt, constants} = require("@wundertrading/wundertrading-sdk");

// client instance
const client = new wbt(
  "API_KEY",
  "SECRET_KEY"
);

async function example() {
    const {items} = await client.getApiProfiles({
        limit: 2,
        statuses: [constants.ApiProfile.Status.Active],
        exchanges: ["BINANCE_FUTURES"],
    });

    console.log(items);
}

example();
```

### Market order trade
* Trade with 2 API profiles (Binance Futures USDT-M)
* Exit conditions (examples with percents values):
  * 2 Take Profits
  * Stop Loss 
  * Trailing Stop
  * Move to Break-Even
```javascript
const {wbt, constants} = require("@wundertrading/wundertrading-sdk");

// client instance
const client = new wbt(
    "API_KEY",
    "SECRET_KEY"
);

async function example() {
    // Your strategy identifier: we recommend using it, since network issues may occur during the strategy trade creation; 
    // however, with the clientId, you will always be able to identify the strategy.
    const clientId = crypto.randomUUID();
    
    const {tradesDetails} = await client.createStrategyTrade({
        clientId: clientId,
        exchangeCode: "BINANCE_FUTURES",
        pairCode: "ADAUSDT",
        profilesCodes: ["106eb6a81159384e", "106eb6a8286813f8"],
        side: constants.Strategy.TradeSide.Long,
        orderType: constants.Strategy.OrderType.Market,
        amountPerTradeType: constants.Strategy.AmountPerTradeType.Dollar,
        amountPerTrade: 50, // 50$
        // exit conditions
        takeProfits: [
            // sell 40% of opened portfolio when 5% profit reached
            { priceDeviation: 0.05, portfolio: 0.4 },
            // sell 60% of opened portfolio when 7% profit reached
            { priceDeviation: 0.07, portfolio: 0.6 },
        ],
        // sell all opened portfolio when 3% loss reached
        stopLoss: 0.03,
        // activate trailing stop when 2% profit reached
        trailingStopActivation: 0.02,
        // execute trailing stop when 1% loss reached from activation
        trailingStopExecute: 0.01,
        // Move to Break-Even when 1% of profit reached
        stopLossMove: 0.01,
    }).then(response => response.result);

    const newStrategy = tradesDetails[0];

    console.log(newStrategy);
    console.assert(newStrategy.clientId === clientId);
}

example();
```

### Limit order trade
* Simple trade with 2 API profiles (Binance Futures USDT-M)
* Exit conditions (examples with prices):
  * 2 Take Profits
  * Stop Loss
```javascript
const {wbt, constants} = require("@wundertrading/wundertrading-sdk");

// client instance
const client = new wbt(
    "API_KEY",
    "SECRET_KEY"
);

async function example() {
    // Your strategy identifier: we recommend using it, since network issues may occur during the strategy trade creation;
    // however, with the clientId, you will always be able to identify the strategy.
    const clientId = crypto.randomUUID();
    
    const {tradesDetails} = await client.createStrategyTrade({
      clientId: clientId,
      exchangeCode: "BINANCE_FUTURES",
      pairCode: "ADAUSDT",
      profilesCodes: ["106eb6a81159384e", "106eb6a8286813f8"],
      side: constants.Strategy.TradeSide.Long,
      orderType: constants.Strategy.OrderType.Market,
      amountPerTradeType: constants.Strategy.AmountPerTradeType.Dollar,
      amountPerTrade: 50, // 50$
      // exit conditions
      takeProfits: [
        // sell 40% of opened portfolio when 5% profit reached
        { priceDeviation: 0.05, portfolio: 0.4 },
        // sell 60% of opened portfolio when 7% profit reached
        { priceDeviation: 0.07, portfolio: 0.6 },
      ],
      // sell all opened portfolio when 50% loss reached
      stopLoss: 0.5,
      // DCA settings
      extraOrderCount: 5, // 1 entry order + 4 DCA orders
      extraOrderDeviation: 0.01, // 1% price deviation
      extraOrderVolumeMultiplier: 1.2, // multiply next DCA order volume by 1.2
    }).then(response => response.result);
    
    const newStrategy = tradesDetails[0];
    
    console.log(newStrategy);
    console.assert(newStrategy.clientId === clientId);
    
    // sleep for 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('---------------------- Fetched full strategy --------------------------');
    const strategy = await client.getStrategyById(clientId);
    console.log(strategy);
}

example();
```

### DCA strategy
* Market order trade with 2 API profiles (Binance Futures USDT-M)
* Exit conditions (examples with percents values):
  * 2 Take Profits
  * Stop Loss
```javascript
const {wbt, constants} = require("@wundertrading/wundertrading-sdk");

// client instance
const client = new wbt(
    "API_KEY",
    "SECRET_KEY"
);

async function example() {
    // Your strategy identifier: we recommend using it, since network issues may occur during the strategy trade creation; 
    // however, with the clientId, you will always be able to identify the strategy.
    const clientId = crypto.randomUUID();
    
    const {tradesDetails} = await client.createStrategyTrade({
        clientId: clientId,
        exchangeCode: "BINANCE_FUTURES",
        pairCode: "ADAUSDT",
        profilesCodes: ["106eb6a81159384e", "106eb6a8286813f8"],
        side: constants.Strategy.TradeSide.Long,
        orderType: constants.Strategy.OrderType.Market,
        amountPerTradeType: constants.Strategy.AmountPerTradeType.Dollar,
        amountPerTrade: 50, // 50$
        // exit conditions
        takeProfits: [
            // sell 40% of opened portfolio when 5% profit reached
            { priceDeviation: 0.05, portfolio: 0.4 },
            // sell 60% of opened portfolio when 7% profit reached
            { priceDeviation: 0.07, portfolio: 0.6 },
        ],
        // sell all opened portfolio when 50% loss reached
        stopLoss: 0.5,
        // DCA settings
        extraOrderCount: 5, // 1 entry order + 4 DCA orders
        extraOrderDeviation: 0.01, // 1% price deviation
        extraOrderVolumeMultiplier: 1.2, // multiply next DCA order volume by 1.2
    }).then(response => response.result);

    const newStrategy = tradesDetails[0];

    console.log(newStrategy);
    console.assert(newStrategy.clientId === clientId);

    // sleep for 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('---------------------- Fetched full strategy --------------------------');
    const strategy = await client.getStrategyById(clientId);
    console.log(strategy);
}

example();
```

### Patch edit DCA strategy
* Edit exit conditions and change extra orders count:
```javascript
const {wbt, constants} = require("@wundertrading/wundertrading-sdk");

// client instance
const client = new wbt(
    "API_KEY",
    "SECRET_KEY"
);

async function example() {
    const idOrclientId = 'your_strategy_client_id_or_id';

    await client.editDcaStrategyTrade(
        idOrclientId,
        {
          // exit conditions
          takeProfits: [
            {portfolio: 0.5, price: 0.3},
            {portfolio: 0.5, price: 0.26}
          ],
          stopLossPrice: 0.123,
          // DCA settings
          extraOrderCount: 8,
        }
    ).then(response => response.result);
}

example();
```

### Market Close strategy
* Market close `entered` trade with 2 API profiles (Binance Futures USDT-M)
* Exit conditions (examples with percents values):
  * 2 Take Profits
  * Stop Loss
```javascript
const {wbt, constants} = require("@wundertrading/wundertrading-sdk");

// client instance
const client = new wbt(
    "API_KEY",
    "SECRET_KEY"
);

async function example() {
    const idOrclientId = 'your_strategy_client_id_or_id';
    
    await client.marketCloseStrategy(idOrclientId);

    // sleep for 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('---------------------- Fetched full strategy --------------------------');
    const strategy = await client.getStrategyById(idOrclientId);
    console.log(strategy);
}

example();
```