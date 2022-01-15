import { ChainId, Token, Pair, TokenAmount, WETH, Price } from '../src'

describe('Pair', () => {
    const NACHO = new Token(ChainId.MAINNET, '0xcD86152047e800d67BDf00A4c635A8B6C0e5C4c2', 18, 'NACHO', 'NACHO')
    const wETH = new Token(ChainId.MAINNET, '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', 18, 'WETH', 'Wrapped Ether')

    describe('#getAddress', () => {
        it('returns the correct address', () => {
            expect(Pair.getAddress(NACHO, wETH)).toEqual('0x8D25fec513309F2d329d99d6F677D46C831FDEe8')
        })
    })

    describe('#token0', () => {
        it('always is the token that sorts before', () => {
            expect(new Pair(new TokenAmount(NACHO, '100'), new TokenAmount(wETH, '100')).token0).toEqual(wETH)
            expect(new Pair(new TokenAmount(wETH, '100'), new TokenAmount(NACHO, '100')).token0).toEqual(wETH)
        })
    })
    describe('#token1', () => {
        it('always is the token that sorts after', () => {
            expect(new Pair(new TokenAmount(NACHO, '100'), new TokenAmount(wETH, '100')).token1).toEqual(NACHO)
            expect(new Pair(new TokenAmount(wETH, '100'), new TokenAmount(NACHO, '100')).token1).toEqual(NACHO)
        })
    })
    describe('#reserve0', () => {
        it('always comes from the token that sorts before', () => {
            expect(new Pair(new TokenAmount(NACHO, '100'), new TokenAmount(wETH, '101')).reserve0).toEqual(
                new TokenAmount(wETH, '101')
            )
            expect(new Pair(new TokenAmount(wETH, '101'), new TokenAmount(NACHO, '100')).reserve0).toEqual(
                new TokenAmount(wETH, '101')
            )
        })
    })
    describe('#reserve1', () => {
        it('always comes from the token that sorts after', () => {
            expect(new Pair(new TokenAmount(NACHO, '100'), new TokenAmount(wETH, '101')).reserve1).toEqual(
                new TokenAmount(NACHO, '100')
            )
            expect(new Pair(new TokenAmount(wETH, '101'), new TokenAmount(NACHO, '100')).reserve1).toEqual(
                new TokenAmount(NACHO, '100')
            )
        })
    })

    describe('#token0Price', () => {
        it('returns price of token0 in terms of token1', () => {
            expect(new Pair(new TokenAmount(NACHO, '101'), new TokenAmount(wETH, '100')).token0Price).toEqual(
                new Price(wETH, NACHO, '100', '101')
            )
            expect(new Pair(new TokenAmount(wETH, '100'), new TokenAmount(NACHO, '101')).token0Price).toEqual(
                new Price(wETH, NACHO, '100', '101')
            )
        })
    })

    describe('#token1Price', () => {
        it('returns price of token1 in terms of token0', () => {
            expect(new Pair(new TokenAmount(NACHO, '101'), new TokenAmount(wETH, '100')).token1Price).toEqual(
                new Price(NACHO, wETH, '101', '100')
            )
            expect(new Pair(new TokenAmount(wETH, '100'), new TokenAmount(NACHO, '101')).token1Price).toEqual(
                new Price(NACHO, wETH, '101', '100')
            )
        })
    })

    describe('#priceOf', () => {
        const pair = new Pair(new TokenAmount(NACHO, '101'), new TokenAmount(wETH, '100'))
        it('returns price of token in terms of other token', () => {
            expect(pair.priceOf(wETH)).toEqual(pair.token0Price)
            expect(pair.priceOf(NACHO)).toEqual(pair.token1Price)
        })

        it('throws if invalid token', () => {
            expect(() => pair.priceOf(WETH[ChainId.MAINNET])).toThrow('TOKEN')
        })
    })

    describe('#reserveOf', () => {
        it('returns reserves of the given token', () => {
            expect(new Pair(new TokenAmount(NACHO, '100'), new TokenAmount(wETH, '101')).reserveOf(NACHO)).toEqual(
                new TokenAmount(NACHO, '100')
            )
            expect(new Pair(new TokenAmount(wETH, '101'), new TokenAmount(NACHO, '100')).reserveOf(NACHO)).toEqual(
                new TokenAmount(NACHO, '100')
            )
        })

        it('throws if not in the pair', () => {
            expect(() =>
                new Pair(new TokenAmount(wETH, '101'), new TokenAmount(NACHO, '100')).reserveOf(WETH[ChainId.MAINNET])
            ).toThrow('TOKEN')
        })
    })

    describe('#chainId', () => {
        it('returns the token0 chainId', () => {
            expect(new Pair(new TokenAmount(NACHO, '100'), new TokenAmount(wETH, '100')).chainId).toEqual(ChainId.MAINNET)
            expect(new Pair(new TokenAmount(wETH, '100'), new TokenAmount(NACHO, '100')).chainId).toEqual(ChainId.MAINNET)
        })
    })

    describe('#involvesToken', () => {
        expect(new Pair(new TokenAmount(NACHO, '100'), new TokenAmount(wETH, '100')).involvesToken(NACHO)).toEqual(true)
        expect(new Pair(new TokenAmount(NACHO, '100'), new TokenAmount(wETH, '100')).involvesToken(wETH)).toEqual(true)
        expect(
            new Pair(new TokenAmount(NACHO, '100'), new TokenAmount(wETH, '100')).involvesToken(WETH[ChainId.MAINNET])
        ).toEqual(false)
    })
})