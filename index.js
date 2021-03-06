var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var Web3 = require('web3');
var HDWalletProvider = require('@truffle/hdwallet-provider');
var moment = require('moment-timezone');
var numeral = require('numeral');
var _ = require('lodash');
var axios = require('axios');
var legos = require('@studydefi/money-legos').legos;
// SERVER CONFIG
var PORT = process.env.PORT || 5001;
var app = express();
var server = http.createServer(app).listen(PORT, function () { return console.log("Listening on " + PORT); });
// WEB3 CONFIG
var web3 = new Web3(process.env.RPC_URL);
// Uniswap Factory Contract: https://etherscan.io/address/0xc0a47dfe034b400b47bdad5fecda2621de6c4d95#code
var uniswapFactoryContract = new web3.eth.Contract(legos.uniswap.factory.abi, legos.uniswap.factory.address);
var KYBER_RATE_ABI = [{ "constant": false, "inputs": [{ "name": "alerter", "type": "address" }], "name": "removeAlerter", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "pendingAdmin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getOperators", "outputs": [{ "name": "", "type": "address[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "token", "type": "address" }, { "name": "amount", "type": "uint256" }, { "name": "sendTo", "type": "address" }], "name": "withdrawToken", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "newAlerter", "type": "address" }], "name": "addAlerter", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "newAdmin", "type": "address" }], "name": "transferAdmin", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "newFactor", "type": "uint256" }], "name": "setQuantityFactor", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "claimAdmin", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "newAdmin", "type": "address" }], "name": "transferAdminQuickly", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getAlerters", "outputs": [{ "name": "", "type": "address[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "newOperator", "type": "address" }], "name": "addOperator", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "worstCaseRateFactorInBps", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "quantityFactor", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "operator", "type": "address" }], "name": "removeOperator", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "kyberNetwork", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "amount", "type": "uint256" }, { "name": "sendTo", "type": "address" }], "name": "withdrawEther", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "src", "type": "address" }, { "name": "dest", "type": "address" }, { "name": "srcQty", "type": "uint256" }, { "name": "usePermissionless", "type": "bool" }], "name": "getExpectedRate", "outputs": [{ "name": "expectedRate", "type": "uint256" }, { "name": "slippageRate", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "token", "type": "address" }, { "name": "user", "type": "address" }], "name": "getBalance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "bps", "type": "uint256" }], "name": "setWorstCaseRateFactor", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "admin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "_kyberNetwork", "type": "address" }, { "name": "_admin", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "newFactor", "type": "uint256" }, { "indexed": false, "name": "oldFactor", "type": "uint256" }, { "indexed": false, "name": "sender", "type": "address" }], "name": "QuantityFactorSet", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "newMin", "type": "uint256" }, { "indexed": false, "name": "oldMin", "type": "uint256" }, { "indexed": false, "name": "sender", "type": "address" }], "name": "MinSlippageFactorSet", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "token", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }, { "indexed": false, "name": "sendTo", "type": "address" }], "name": "TokenWithdraw", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "amount", "type": "uint256" }, { "indexed": false, "name": "sendTo", "type": "address" }], "name": "EtherWithdraw", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "pendingAdmin", "type": "address" }], "name": "TransferAdminPending", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "newAdmin", "type": "address" }, { "indexed": false, "name": "previousAdmin", "type": "address" }], "name": "AdminClaimed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "newAlerter", "type": "address" }, { "indexed": false, "name": "isAdd", "type": "bool" }], "name": "AlerterAdded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "newOperator", "type": "address" }, { "indexed": false, "name": "isAdd", "type": "bool" }], "name": "OperatorAdded", "type": "event" }];
var KYBER_RATE_ADDRESS = '0x96b610046d63638d970e6243151311d8827d69a5';
var kyberRateContract = new web3.eth.Contract(KYBER_RATE_ABI, KYBER_RATE_ADDRESS);
function checkPair(args) {
    return __awaiter(this, void 0, void 0, function () {
        var inputTokenSymbol, inputTokenAddress, outputTokenSymbol, outputTokenAddress, inputAmount, exchangeAddress, abiJson, theAbi, exchangeContract, uniswapResult, kyberResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    inputTokenSymbol = args.inputTokenSymbol, inputTokenAddress = args.inputTokenAddress, outputTokenSymbol = args.outputTokenSymbol, outputTokenAddress = args.outputTokenAddress, inputAmount = args.inputAmount;
                    return [4 /*yield*/, uniswapFactoryContract.methods.getExchange(outputTokenAddress).call()];
                case 1:
                    exchangeAddress = _a.sent();
                    abiJson = { "name": "getEthToTokenInputPrice", "outputs": [{ "type": "uint256", "name": "out" }], "inputs": [{ "type": "uint256", "name": "eth_sold" }], "constant": true, "payable": false, "type": "function", "gas": 5542 };
                    theAbi = legos.uniswap.factory.abi;
                    theAbi.push(abiJson);
                    exchangeContract = new web3.eth.Contract(theAbi, exchangeAddress);
                    return [4 /*yield*/, exchangeContract.methods.getEthToTokenInputPrice(inputAmount).call()];
                case 2:
                    uniswapResult = _a.sent();
                    return [4 /*yield*/, kyberRateContract.methods.getExpectedRate(inputTokenAddress, outputTokenAddress, inputAmount, true).call()];
                case 3:
                    kyberResult = _a.sent();
                    console.table([{
                            'Input Token': inputTokenSymbol,
                            'Output Token': outputTokenSymbol,
                            'Input Amount': web3.utils.fromWei(inputAmount, 'Ether'),
                            'Uniswap Return': web3.utils.fromWei(uniswapResult, 'Ether'),
                            'Kyber Expected Rate': web3.utils.fromWei(kyberResult.expectedRate, 'Ether'),
                            'Kyber Min Return': web3.utils.fromWei(kyberResult.slippageRate, 'Ether'),
                            'Timestamp': moment().tz('America/Chicago').format()
                        }]);
                    return [2 /*return*/];
            }
        });
    });
}
var priceMonitor;
var monitoringPrice = false;
function monitorPrice() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (monitoringPrice) {
                        return [2 /*return*/];
                    }
                    console.log("Checking prices...");
                    monitoringPrice = true;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    // ADD YOUR CUSTOM TOKEN PAIRS HERE!!!
                    return [4 /*yield*/, checkPair({
                            inputTokenSymbol: 'ETH',
                            inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
                            outputTokenSymbol: 'DAI',
                            outputTokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
                            inputAmount: web3.utils.toWei('1', 'ETHER')
                        })
                        //    await checkPair({
                        //      inputTokenSymbol: 'ETH',
                        //      inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
                        //      outputTokenSymbol: 'MKR',
                        //      outputTokenAddress: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
                        //      inputAmount: web3.utils.toWei('1', 'ETHER')
                        //    })
                        //
                        //    await checkPair({
                        //      inputTokenSymbol: 'ETH',
                        //      inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
                        //      outputTokenSymbol: 'DAI',
                        //      outputTokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
                        //      inputAmount: web3.utils.toWei('1', 'ETHER')
                        //    })
                        //
                        //    await checkPair({
                        //      inputTokenSymbol: 'ETH',
                        //      inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
                        //      outputTokenSymbol: 'KNC',
                        //      outputTokenAddress: '0xdd974d5c2e2928dea5f71b9825b8b646686bd200',
                        //      inputAmount: web3.utils.toWei('1', 'ETHER')
                        //    })
                        //
                        //    await checkPair({
                        //      inputTokenSymbol: 'ETH',
                        //      inputTokenAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
                        //      outputTokenSymbol: 'LINK',
                        //      outputTokenAddress: '0x514910771af9ca656af840dff83e8264ecf986ca',
                        //      inputAmount: web3.utils.toWei('1', 'ETHER')
                        //    })
                    ];
                case 2:
                    // ADD YOUR CUSTOM TOKEN PAIRS HERE!!!
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    monitoringPrice = false;
                    clearInterval(priceMonitor);
                    return [2 /*return*/];
                case 4:
                    monitoringPrice = false;
                    return [2 /*return*/];
            }
        });
    });
}
// Check markets every n seconds
var POLLING_INTERVAL = 1000; // 3 Seconds
priceMonitor = setInterval(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, monitorPrice()];
        case 1:
            _a.sent();
            return [2 /*return*/];
    }
}); }); }, POLLING_INTERVAL);
