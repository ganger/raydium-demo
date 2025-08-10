"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPositionInfo = void 0;
var raydium_sdk_v2_1 = require("@raydium-io/raydium-sdk-v2");
var web3_js_1 = require("@solana/web3.js");
var decimal_js_1 = require("decimal.js");
var bn_js_1 = require("bn.js");
var config_1 = require("../config");
var fetchPositionInfo = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var raydium, _c, position, positionPubKey, pos, poolInfo, data, epochInfo, priceLower, priceUpper, _d, amountA, amountB, _e, pooledAmountA, pooledAmountB, _f, tickLowerArrayAddress, tickUpperArrayAddress, tickArrayRes, tickArrayLower, tickArrayUpper, tickLowerState, tickUpperState, rpcPoolData, tokenFees, rewards, _g, tokenFeeAmountA, tokenFeeAmountB, _h, rewardMintAFee, rewardMintBFee, rewardInfos, poolRewardInfos, feeARewardIdx, feeBRewardIdx;
    var positionNftMint = _b.positionNftMint, positionData = _b.positionData, propsRaydium = _b.raydium, _j = _b.programId, programId = _j === void 0 ? raydium_sdk_v2_1.CLMM_PROGRAM_ID : _j, _k = _b.isLock, isLock = _k === void 0 ? false : _k, notExit = _b.notExit;
    return __generator(this, function (_l) {
        switch (_l.label) {
            case 0:
                if (!(propsRaydium !== null && propsRaydium !== void 0)) return [3 /*break*/, 1];
                _c = propsRaydium;
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, (0, config_1.initSdk)()];
            case 2:
                _c = (_l.sent());
                _l.label = 3;
            case 3:
                raydium = _c;
                position = positionData;
                if (!!position) return [3 /*break*/, 5];
                positionPubKey = isLock
                    ? positionNftMint
                    : (0, raydium_sdk_v2_1.getPdaPersonalPositionAddress)(programId, positionNftMint).publicKey;
                return [4 /*yield*/, raydium.connection.getAccountInfo(positionPubKey)];
            case 4:
                pos = _l.sent();
                if (!pos) {
                    console.log("".concat(positionNftMint.toBase58(), " position data not found"));
                }
                position = raydium_sdk_v2_1.PositionInfoLayout.decode(pos.data);
                _l.label = 5;
            case 5:
                if (!(raydium.cluster === 'mainnet')) return [3 /*break*/, 7];
                return [4 /*yield*/, raydium.api.fetchPoolById({ ids: position.poolId.toBase58() })];
            case 6:
                poolInfo = (_l.sent())[0];
                return [3 /*break*/, 9];
            case 7: return [4 /*yield*/, raydium.clmm.getPoolInfoFromRpc(position.poolId.toBase58())];
            case 8:
                data = _l.sent();
                poolInfo = data.poolInfo;
                _l.label = 9;
            case 9: return [4 /*yield*/, raydium.connection.getEpochInfo()
                /** get position pooled amount and price range */
            ];
            case 10:
                epochInfo = _l.sent();
                priceLower = raydium_sdk_v2_1.TickUtils.getTickPrice({
                    poolInfo: poolInfo,
                    tick: position.tickLower,
                    baseIn: true,
                });
                priceUpper = raydium_sdk_v2_1.TickUtils.getTickPrice({
                    poolInfo: poolInfo,
                    tick: position.tickUpper,
                    baseIn: true,
                });
                _d = raydium_sdk_v2_1.PositionUtils.getAmountsFromLiquidity({
                    poolInfo: poolInfo,
                    ownerPosition: position,
                    liquidity: position.liquidity,
                    slippage: 0,
                    add: false,
                    epochInfo: epochInfo,
                }), amountA = _d.amountA, amountB = _d.amountB;
                _e = [
                    new decimal_js_1.default(amountA.amount.toString()).div(Math.pow(10, poolInfo.mintA.decimals)),
                    new decimal_js_1.default(amountB.amount.toString()).div(Math.pow(10, poolInfo.mintB.decimals)),
                ], pooledAmountA = _e[0], pooledAmountB = _e[1];
                _f = [
                    raydium_sdk_v2_1.TickUtils.getTickArrayAddressByTick(new web3_js_1.PublicKey(poolInfo.programId), new web3_js_1.PublicKey(poolInfo.id), position.tickLower, poolInfo.config.tickSpacing),
                    raydium_sdk_v2_1.TickUtils.getTickArrayAddressByTick(new web3_js_1.PublicKey(poolInfo.programId), new web3_js_1.PublicKey(poolInfo.id), position.tickUpper, poolInfo.config.tickSpacing),
                ], tickLowerArrayAddress = _f[0], tickUpperArrayAddress = _f[1];
                return [4 /*yield*/, raydium.connection.getMultipleAccountsInfo([tickLowerArrayAddress, tickUpperArrayAddress])];
            case 11:
                tickArrayRes = _l.sent();
                if (!tickArrayRes[0] || !tickArrayRes[1])
                    throw new Error('tick data not found');
                tickArrayLower = raydium_sdk_v2_1.TickArrayLayout.decode(tickArrayRes[0].data);
                tickArrayUpper = raydium_sdk_v2_1.TickArrayLayout.decode(tickArrayRes[1].data);
                tickLowerState = tickArrayLower.ticks[raydium_sdk_v2_1.TickUtils.getTickOffsetInArray(position.tickLower, poolInfo.config.tickSpacing)];
                tickUpperState = tickArrayUpper.ticks[raydium_sdk_v2_1.TickUtils.getTickOffsetInArray(position.tickUpper, poolInfo.config.tickSpacing)];
                return [4 /*yield*/, raydium.clmm.getRpcClmmPoolInfo({ poolId: position.poolId })];
            case 12:
                rpcPoolData = _l.sent();
                tokenFees = raydium_sdk_v2_1.PositionUtils.GetPositionFeesV2(rpcPoolData, position, tickLowerState, tickUpperState);
                rewards = raydium_sdk_v2_1.PositionUtils.GetPositionRewardsV2(rpcPoolData, position, tickLowerState, tickUpperState);
                _g = [
                    tokenFees.tokenFeeAmountA.gte(new bn_js_1.default(0)) && tokenFees.tokenFeeAmountA.lt(raydium_sdk_v2_1.U64_IGNORE_RANGE)
                        ? tokenFees.tokenFeeAmountA
                        : new bn_js_1.default(0),
                    tokenFees.tokenFeeAmountB.gte(new bn_js_1.default(0)) && tokenFees.tokenFeeAmountB.lt(raydium_sdk_v2_1.U64_IGNORE_RANGE)
                        ? tokenFees.tokenFeeAmountB
                        : new bn_js_1.default(0),
                ], tokenFeeAmountA = _g[0], tokenFeeAmountB = _g[1];
                _h = [
                    {
                        mint: poolInfo.mintA,
                        amount: new decimal_js_1.default(tokenFeeAmountA.toString())
                            .div(Math.pow(10, poolInfo.mintA.decimals))
                            .toDecimalPlaces(poolInfo.mintA.decimals),
                    },
                    {
                        mint: poolInfo.mintB,
                        amount: new decimal_js_1.default(tokenFeeAmountB.toString())
                            .div(Math.pow(10, poolInfo.mintB.decimals))
                            .toDecimalPlaces(poolInfo.mintB.decimals),
                    },
                ], rewardMintAFee = _h[0], rewardMintBFee = _h[1];
                rewardInfos = rewards.map(function (r) { return (r.gte(new bn_js_1.default(0)) && r.lt(raydium_sdk_v2_1.U64_IGNORE_RANGE) ? r : new bn_js_1.default(0)); });
                poolRewardInfos = rewardInfos
                    .map(function (r, idx) {
                    var _a;
                    var rewardMint = (_a = poolInfo.rewardDefaultInfos.find(function (r) { return r.mint.address === rpcPoolData.rewardInfos[idx].tokenMint.toBase58(); })) === null || _a === void 0 ? void 0 : _a.mint;
                    if (!rewardMint)
                        return undefined;
                    return {
                        mint: rewardMint,
                        amount: new decimal_js_1.default(r.toString()).div(Math.pow(10, rewardMint.decimals)).toDecimalPlaces(rewardMint.decimals),
                    };
                })
                    .filter(Boolean);
                feeARewardIdx = poolRewardInfos.findIndex(function (r) { return r.mint.address === poolInfo.mintA.address; });
                if (poolRewardInfos[feeARewardIdx])
                    poolRewardInfos[feeARewardIdx].amount = poolRewardInfos[feeARewardIdx].amount.add(rewardMintAFee.amount);
                else
                    poolRewardInfos.push(rewardMintAFee);
                feeBRewardIdx = poolRewardInfos.findIndex(function (r) { return r.mint.address === poolInfo.mintB.address; });
                if (poolRewardInfos[feeBRewardIdx])
                    poolRewardInfos[feeBRewardIdx].amount = poolRewardInfos[feeBRewardIdx].amount.add(rewardMintBFee.amount);
                else
                    poolRewardInfos.push(rewardMintBFee);
                console.log("".concat(isLock ? 'Locked ' : '', "position info"), {
                    pool: "".concat(poolInfo.mintA.symbol, " - ").concat(poolInfo.mintB.symbol),
                    nft: position.nftMint.toBase58(),
                    priceLower: priceLower.price.toString(),
                    priceUpper: priceUpper.price.toString(),
                    pooledAmountA: pooledAmountA.toString(),
                    pooledAmountB: pooledAmountB.toString(),
                    rewardInfos: poolRewardInfos.map(function (r) { return ({
                        mint: r.mint.symbol.replace(/WSOL/gi, 'SOL'),
                        amount: r.amount.toString(),
                    }); }),
                });
                if (!notExit)
                    process.exit(); // if you don't want to end up node execution, comment this line
                return [2 /*return*/];
        }
    });
}); };
exports.fetchPositionInfo = fetchPositionInfo;
/** uncomment code below to execute */
(0, exports.fetchPositionInfo)({ positionNftMint: new web3_js_1.PublicKey('position nft mint') });
