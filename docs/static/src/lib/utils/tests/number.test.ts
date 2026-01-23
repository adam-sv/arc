import { NumberUtils } from '@adam-sv/arc';
const { round } = NumberUtils;

describe('NumberUtils.round', () => {
  test('it should round many sig figs successfully', () => {
    const output1 = round(1.123456789012345, 'closest', 1);
    expect(output1).toEqual(1);

    const output2 = round(1.123456789012345, 'closest', 0.000000000000001);
    expect(output2).toEqual(1.123456789012345);

    const output3 = round(1.123456789012345, 'closest', 1);
    expect(output3).toEqual(1);

    const output4 = round(1.123456789012345, 'closest', 0.000000000000001);
    expect(output4).toEqual(1.123456789012345);

    const output5 = round(1234567890123456, 'closest', 1000);
    expect(output5).toEqual(1234567890123000);

    // Negatives
    const output6 = round(-1.123456789012345, 'closest', 1);
    expect(output6).toEqual(-1);

    const output7 = round(-1.123456789012345, 'closest', 0.000000000000001);
    expect(output7).toEqual(-1.123456789012345);

    const output8 = round(-1.123456789012345, 'closest', 1);
    expect(output8).toEqual(-1);

    const output9 = round(-1.123456789012345, 'closest', 0.000000000000001);
    expect(output9).toEqual(-1.123456789012345);

    const output10 = round(-1234567890123456, 'closest', 1000);
    expect(output10).toEqual(-1234567890123000);
  });

  test('it should handle numbers that do not need to be rounded successfully', () => {
    const output1 = round(36372.86, 'closest', 0.01);
    expect(output1).toEqual(36372.86);

    const output2 = round(36372, 'closest', 1);
    expect(output2).toEqual(36372);

    const output3 = round(36300, 'closest', 100);
    expect(output3).toEqual(36300);

    // Negatives
    const output4 = round(-36372.86, 'closest', 0.01);
    expect(output4).toEqual(-36372.86);

    const output5 = round(-36372, 'closest', 1);
    expect(output5).toEqual(-36372);

    const output6 = round(-36300, 'closest', 100);
    expect(output6).toEqual(-36300);
  });

  test('it should round with different bases successfully', () => {
    const output1 = round(6, 'closest', 2, 1);
    expect(output1).toEqual(7); // rounds up because its in the middle

    const output2 = round(-6, 'closest', 2, 1);
    expect(output2).toEqual(-5); // rounds up because its in the middle

    const output3 = round(5.999999999999, 'closest', 2, 1);
    expect(output3).toEqual(5);

    const output4 = round(-6.00000000001, 'closest', 2, 1);
    expect(output4).toEqual(-7);

    const output5 = round(6, 'closest', 3, 2);
    expect(output5).toEqual(5);

    const output6 = round(-6, 'closest', 3, 2);
    expect(output6).toEqual(-7);
  });

  test('it should round known problem numbers properly', () => {
    const output1 = round(23.334, 'closest', 0.01);
    expect(output1).toEqual(23.33);

    const output2 = round(23.33, 'closest', 0.01);
    expect(output2).toEqual(23.33);

    const output3 = round(23.335, 'closest', 0.01);
    expect(output3).toEqual(23.34);

    const output4 = round(23.336, 'closest', 0.01);
    expect(output4).toEqual(23.34);

    const output5 = round(1.999, 'closest', 0.01).toString();
    expect(output5).toEqual('2');
  });
});
