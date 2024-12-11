import { getFormHeadings } from './get-form-headings';

describe('getFormHeadings', () => {
  it('should return should return the correct title and description for step 1', () => {
    const result = getFormHeadings(1);
    expect(result.title).toBe('Personal Information');
    expect(result.description).toBe('Please provide your personal details');
  });

  it('should return the correct title and description for step 2', () => {
    const result = getFormHeadings(2);
    expect(result.title).toBe('Select your plan');
    expect(result.description).toBe(
      'You have the option of monthly or yearly billing.'
    );
  });

  it('should return the correct title and description for step 3', () => {
    const result = getFormHeadings(3);
    expect(result.title).toBe('Pick add-ons');
    expect(result.description).toBe(
      'Add-ons help enhance your gaming experience.'
    );
  });

  it('should return the correct title and description for step 4', () => {
    const result = getFormHeadings(4);
    expect(result.title).toBe('Finishing up');
    expect(result.description).toBe(
      'Double-check everything looks OK before confirming.'
    );
  });

  it('should return empty title and description for any invalid step', () => {
    const result = getFormHeadings(0);
    expect(result.title).toBe('');
    expect(result.description).toBe('');

    const result2 = getFormHeadings(5);
    expect(result2.title).toBe('');
    expect(result2.description).toBe('');

    const result3 = getFormHeadings(-1);
    expect(result3.title).toBe('');
    expect(result3.description).toBe('');
  });
});
