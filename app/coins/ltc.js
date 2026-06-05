"use strict";

const Decimal = require("decimal.js");
const Decimal8 = Decimal.clone({ precision:8, rounding:8 });

const blockRewardEras = [ new Decimal8(50) ];
for (let i = 1; i < 34; i++) {
	let previous = blockRewardEras[i - 1];
	blockRewardEras.push(new Decimal8(previous).dividedBy(2));
}

const currencyUnits = [
	{
		type:"native",
		name:"LTC",
		multiplier:1,
		default:true,
		values:["", "ltc", "LTC"],
		decimalPlaces:8
	},
	{
		type:"native",
		name:"LTC",
		multiplier:1000,
		values:["mltc"],
		decimalPlaces:5
	},
	{
		type:"native",
		name:"bits",
		multiplier:1000000,
		values:["bits"],
		decimalPlaces:2
	},
	{
		type:"native",
		name:"lit",
		multiplier:100000000,
		values:["lit", "litoshi"],
		decimalPlaces:0
	},
	{
		type:"exchanged",
		name:"USD",
		multiplier:"usd",
		values:["usd"],
		decimalPlaces:2,
		symbol:"$"
	},
	{
		type:"exchanged",
		name:"EUR",
		multiplier:"eur",
		values:["eur"],
		decimalPlaces:2,
		symbol:"€"
	},
];

module.exports = {
	name:"Litecoin",
	ticker:"LTC",
	logoUrlsByNetwork:{
		"main":"./img/network-mainnet/logo.svg",
		"test":"./img/network-testnet/logo.svg",
		"regtest":"./img/network-regtest/logo.svg"
	},
	coinIconUrlsByNetwork:{
		"main":"./img/network-mainnet/coin-icon.svg",
		"test":"./img/network-testnet/coin-icon.svg",
		"regtest":"./img/network-regtest/coin-icon.svg"
	},
	coinColorsByNetwork: {
		"main": "#F7931A",
		"test": "#1daf00",
		"regtest": "#777"
	},
	siteTitlesByNetwork: {
		"main":"Litecoin Explorer",
		"test":"Testnet Explorer",
		"regtest":"Regtest Explorer",
	},
	knownTransactionsByNetwork: {
		main: "f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16",
		test: "22e7e860660f368b5c653c272b0445a0625d19fdec02fc158ef9800a5c3a07e8",
	},
	miningPoolsConfigUrls:[
		"https://raw.githubusercontent.com/btc21/Bitcoin-Known-Miners/master/miners.json",
		"https://raw.githubusercontent.com/bitcoin-data/mining-pools/generated/pools.json",
		"https://raw.githubusercontent.com/btccom/Blockchain-Known-Pools/master/pools.json",
		"https://raw.githubusercontent.com/blockchain/Blockchain-Known-Pools/master/pools.json"
	],
	maxBlockWeight: 4000000,
	maxBlockSize: 1000000,
	minTxBytes: 166, // ref: https://en.bitcoin.it/wiki/Maximum_transaction_rate
	minTxWeight: 166 * 4, // hack
	difficultyAdjustmentBlockCount: 2016,
	maxSupplyByNetwork: {
		"main": new Decimal(84000000),
		"test": new Decimal(84000000),
		"regtest": new Decimal(84000000)
	},
	targetBlockTimeSeconds: 150,
	targetBlockTimeMinutes: 2.5,
	currencyUnits:currencyUnits,
	currencyUnitsByName:{"LTC":currencyUnits[0], "mLTC":currencyUnits[1], "bits":currencyUnits[2], "lit":currencyUnits[3]},
	baseCurrencyUnit:currencyUnits[3],
	defaultCurrencyUnit:currencyUnits[0],
	feeLitoshiPerByteBucketMaxima: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 50, 75, 100, 150],
	
	halvingBlockIntervalsByNetwork: {
		"main": 840000,
		"test": 840000,
		"regtest": 150
	},

	terminalHalvingCountByNetwork: {
		"main": 32,
		"test": 32,
		"regtest": 32
	},

	// used for supply estimates that don't need full gettxoutset accuracy
	coinSupplyCheckpointsByNetwork: {
		"main": [ 2854525, new Decimal(75588768.58) ],
		"test": [ 1940614, new Decimal(20963051.112) ], // TODO: update for Litecoin testnet
		"regtest": [ 0, new Decimal(0) ]
	},

	utxoSetCheckpointsByNetwork: {
		// this includes values from running gettxoutsetinfo with both "muhash" and "hash_serialized_2" params
		"main": {
			// "muhash"
			"height": 2854525,
			"bestblock": "bf5210ea43af6dd2f3aa2c69620c6326554280d2edf4f67da6ca1b29c00349b0",
			"txouts": 57934228,
			"bogosize": 4268119225,
			"muhash": "b898636ba60c053ea5961146436307264f7bbfc43ee3931b6b69acf2c4154f71",
			"total_amount": "75588768.58557639",
			"total_unspendable_amount": "50.00", // coinbase transaction

			// "hash_serialized_2"
			"transactions": 32768281,
			"disk_size": 3477711444,
			"hash_serialized_2": "b1c37dd81bfa0b40d9858366a32b17e4a6f71ae03fe3b76579cb82a57b2441d1",

			"lastUpdated": 1740926448
		}
	},
	
	genesisBlockHashesByNetwork:{
		"main":	"12a765e31ffd4059bada1e25190f6e98c99d9714d334efa41a195a7e7e04bfe2",
		"test":	"4966625a4b2851d9fdee139e56211a0d88575f59ed816ff5e6a63deb4e3e29a0",
		"regtest": "530827f38f93b43ed12af0b3ad25a288dc02ed74d6d7857862df51fc56c416f9",
	},
	genesisCoinbaseTransactionIdsByNetwork: {
		"main":	"12a765e31ffd4059bada1e25190f6e98c99d9714d334efa41a195a7e7e04bfe2",
		"test":	"4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
		"regtest": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b"
	},
	genesisCoinbaseTransactionsByNetwork:{
		"main": {
			"hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4804ffff001d0104404e592054696d65732030352f4f63742f32303131205374657665204a6f62732c204170706c65e280997320566973696f6e6172792c2044696573206174203536ffffffff0100f2052a010000004341040184710fa689ad5023690c80f3a49c8f13f8d45b8c857fbcbc8bc4a8e4d3eb4b10f4d4604fa08dce601aaf0f470216fe1b51850b4acf21b179c45070ac7b03a9ac00000000",
			"txid": "97ddfbbae6be97fd6cdf3e7ca13232a3afff2353e29badfab7f73011edd4ced9",
			"hash": "97ddfbbae6be97fd6cdf3e7ca13232a3afff2353e29badfab7f73011edd4ced9",
			"size": 280,
			"vsize": 280,
			"version": 1,
			"confirmations":2854531,
			"vin": [
				{
					"coinbase": "04ffff001d0104404e592054696d65732030352f4f63742f32303131205374657665204a6f62732c204170706c65e280997320566973696f6e6172792c2044696573206174203536",
					"sequence": 4294967295
				}
			],
			"vout": [
				{
					"value": 50,
					"n": 0,
					"scriptPubKey": {
						"asm": "040184710fa689ad5023690c80f3a49c8f13f8d45b8c857fbcbc8bc4a8e4d3eb4b10f4d4604fa08dce601aaf0f470216fe1b51850b4acf21b179c45070ac7b03a9 OP_CHECKSIG",
						"hex": "41040184710fa689ad5023690c80f3a49c8f13f8d45b8c857fbcbc8bc4a8e4d3eb4b10f4d4604fa08dce601aaf0f470216fe1b51850b4acf21b179c45070ac7b03a9ac",
						"reqSigs": 1,
						"type": "pubkey",
						"addresses": [
							"1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
						]
					}
				}
			],
			"blockhash": "12a765e31ffd4059bada1e25190f6e98c99d9714d334efa41a195a7e7e04bfe2",
			"time": 1317972665,
			"blocktime": 1317972665
		},
		"test": {
			"hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000",
			"txid": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
			"hash": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
			"version": 1,
			"size": 204,
			"vsize": 204,
			"weight": 816,
			"locktime": 0,
			"vin": [
				{
					"coinbase": "04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73",
					"sequence": 4294967295
				}
			],
			"vout": [
				{
					"value": 50.00000000,
					"n": 0,
					"scriptPubKey": {
						"asm": "04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f OP_CHECKSIG",
						"hex": "4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac",
						"reqSigs": 1,
						"type": "pubkey",
						"addresses": [
							"mpXwg4jMtRhuSpVq4xS3HFHmCmWp9NyGKt"
						]
					}
				}
			],
			"blockhash": "000000000933ea01ad0ee984209779baaec3ced90fa3f408719526f8d77f4943",
			"time": 1296688602,
			"blocktime": 1296688602
		},
		"regtest": {
			"hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000",
			"txid": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
			"hash": "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
			"version": 1,
			"size": 204,
			"vsize": 204,
			"weight": 816,
			"locktime": 0,
			"vin": [
				{
					"coinbase": "04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73",
					"sequence": 4294967295
				}
			],
			"vout": [
				{
					"value": 50.00000000,
					"n": 0,
					"scriptPubKey": {
						"asm": "04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f OP_CHECKSIG",
						"hex": "4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac",
						"type": "pubkey"
					}
				}
			],
			"blockhash": "0f9188f13cb7b2c71f2a335e3a4fc328bf5beb436012afca590b1a11466e2206",
			"time": 1296688602,
			"blocktime": 1296688602
		}
	},
	genesisBlockStatsByNetwork:{
		"main": {
			"avgfee": 0,
			"avgfeerate": 0,
			"avgtxsize": 0,
			"blockhash": "12a765e31ffd4059bada1e25190f6e98c99d9714d334efa41a195a7e7e04bfe2",
			"feerate_percentiles": [
				0,
				0,
				0,
				0,
				0
			],
			"height": 0,
			"ins": 0,
			"maxfee": 0,
			"maxfeerate": 0,
			"maxtxsize": 0,
			"medianfee": 0,
			"mediantime": 1317972665,
			"mediantxsize": 0,
			"minfee": 0,
			"minfeerate": 0,
			"mintxsize": 0,
			"outs": 1,
			"subsidy": 5000000000,
			"swtotal_size": 0,
			"swtotal_weight": 0,
			"swtxs": 0,
			"time": 1317972665,
			"total_out": 0,
			"total_size": 0,
			"total_weight": 0,
			"totalfee": 0,
			"txs": 1,
			"utxo_increase": 1,
			"utxo_size_inc": 280
		},
		"test": {
			"avgfee": 0,
			"avgfeerate": 0,
			"avgtxsize": 0,
			"blockhash": "000000000933ea01ad0ee984209779baaec3ced90fa3f408719526f8d77f4943",
			"feerate_percentiles": [
				0,
				0,
				0,
				0,
				0
			],
			"height": 0,
			"ins": 0,
			"maxfee": 0,
			"maxfeerate": 0,
			"maxtxsize": 0,
			"medianfee": 0,
			"mediantime": 1296688602,
			"mediantxsize": 0,
			"minfee": 0,
			"minfeerate": 0,
			"mintxsize": 0,
			"outs": 1,
			"subsidy": 5000000000,
			"swtotal_size": 0,
			"swtotal_weight": 0,
			"swtxs": 0,
			"time": 1296688602,
			"total_out": 0,
			"total_size": 0,
			"total_weight": 0,
			"totalfee": 0,
			"txs": 1,
			"utxo_increase": 1,
			"utxo_size_inc": 117
		},
		"regtest": {
			"avgfee": 0,
			"avgfeerate": 0,
			"avgtxsize": 0,
			"blockhash": "0f9188f13cb7b2c71f2a335e3a4fc328bf5beb436012afca590b1a11466e2206",
			"feerate_percentiles": [
				0,
				0,
				0,
				0,
				0
			],
			"height": 0,
			"ins": 0,
			"maxfee": 0,
			"maxfeerate": 0,
			"maxtxsize": 0,
			"medianfee": 0,
			"mediantime": 1296688602,
			"mediantxsize": 0,
			"minfee": 0,
			"minfeerate": 0,
			"mintxsize": 0,
			"outs": 1,
			"subsidy": 5000000000,
			"swtotal_size": 0,
			"swtotal_weight": 0,
			"swtxs": 0,
			"time": 1296688602,
			"total_out": 0,
			"total_size": 0,
			"total_weight": 0,
			"totalfee": 0,
			"txs": 1,
			"utxo_increase": 1,
			"utxo_size_inc": 117
		}
	},
	testData: {
		txDisplayTestList: {
			"4508218dffb92d56d0a95cdb6fb1aa0dd0f2f20cc9a6016e6dc0b5657a6dd66b" : {
				blockHeight: 383640, blockHash: "2b6809f094a9215bafc65eb3f110a35127a34be94b7d0590a096c3f126c6f364"
			},
			"cd5239f7280643c9e7e75223fe3f7bc067787981b2462a16c148064370f1702c" : {
				blockHeight: 409004, blockHash: "487518d663d9f1fa08611d9395ad74d982b667fbdc0e77e9cf39b4f1355908a3"
			},
			"72e893f6c0e9a65ec227587b93aa45f21ab2f2a546b979654cc6443309e8a75b" : {
				blockHeight: 456000, blockHash: "bf34f71cc6366cd487930d06be22f897e34ca6a40501ac7d401be32456372004"
			},
			"fdb1ad4363a926558287927652a47cde1dba0bb40eda784b705e75d3043ea92e" : {
				blockHeight: 638902, blockHash: "15238656e8ec63d28de29a8c75fcf3a5819afc953dcd9cc45cecc53baec74f38"
			},
			"ae9699ea8afbc5eed576e2b3be16ce69e1e3c9352191cc1bf45a98d7ec2f83fd" : {
				blockHeight: 721000, blockHash: "198a7b4de1df9478e2463bd99d75b714eab235a2e63e741641dc8a759a9840e5"
			}
		}
	},
	genesisCoinbaseOutputAddressScripthash:"97ddfbbae6be97fd6cdf3e7ca13232a3afff2353e29badfab7f73011edd4ced9",
	exchangeRateData:{
		jsonUrl:"https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=usd,gbp,eur",
		responseBodySelectorFunction: function(responseBody) {
			// console.log("Exchange Rate Response: " + JSON.stringify(responseBody));
		
			var exchangedCurrencies = ["USD", "GBP", "EUR"];
			var exchangeRates = {};
		
			if (responseBody.litecoin) {
				for (var i = 0; i < exchangedCurrencies.length; i++) {
					var currency = exchangedCurrencies[i].toLowerCase();
					if (responseBody.litecoin[currency] !== undefined) {
						exchangeRates[currency] = responseBody.litecoin[currency];
					}
				}
				return exchangeRates;
			}
		
			return null;
		}		
	},
	goldExchangeRateData:{
		jsonUrl:"https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument/XAU/USD",
		responseBodySelectorFunction:function(responseBody) {
			//console.log("Exchange Rate Response: " + JSON.stringify(responseBody));

			if (responseBody[0].topo && responseBody[0].topo.platform == "MT5") {
				var prices = responseBody[0].spreadProfilePrices[0];
				
				return {
					usd: prices.ask
				};
			}
			
			return null;
		}
	},
	blockRewardFunction:function(blockHeight, chain) {
		let halvingBlockInterval = (chain == "regtest" ? 150 : 210000);
		let index = Math.floor(blockHeight / halvingBlockInterval);

		return blockRewardEras[index];
	}
};
