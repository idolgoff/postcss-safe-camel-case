const postcss = require('postcss');

const plugin = require('./');

const test = async (input, output, opts ) => {
    return postcss([ plugin(opts) ])
        .process(input, { from: undefined })
        .then(function (result) {
            expect(result.css).toBe(output);
            expect(result.warnings()).toEqual([]);
        })
};

describe('postcss-camel-case', () => {

    it('should convert BEM style class names', async () => {
        await test('.block_element--modifier {}', '.blockElementModifier {}', {});
    });

    it('should convert uppercased BEM style class names', async () => {
        await test('.Block_Element--Modifier {}', '.blockElementModifier {}', {});
    });

    it('should convert complex class names safely', async () => {
        await test('.block__element--modifier1 :not(:first-child) div.name-space {}', '.blockElementModifier1 :not(:first-child) div.nameSpace {}', {});
        await test('span {}', 'span {}', {});
        await test('div:last-child {}', 'div:last-child {}', {});
        await test('.menu {}', '.menu {}', {});
        await test('.flex-row {}', '.flexRow {}', {});
    });

    it('should convert nested class names safely', async () => {
        await test('&primary {}', '&Primary {}', {});
        await test('&Primary {}', '&Primary {}', {});
        await test('&:hover {}', '&:hover {}', {});
        await test('&::-webkit-scrollbar {}', '&::-webkit-scrollbar {}', {});
        await test('& li {}', '& li {}', {});
        await test('& .control {}', '& .control {}', {});
        await test('&:nth-child(1) {}', '&:nth-child(1) {}', {});
        await test('> span {}', '> span {}', {});
    });

});
