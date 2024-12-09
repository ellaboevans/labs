interface StepResults {
  title: string;
  description: string;
}

export function getFormHeadings(step: number): StepResults {
  switch (step) {
    case 1:
      return {
        title: 'Personal Information',
        description: 'Please provide your personal details',
      };
    case 2:
      return {
        title: 'Select your plan',
        description: 'You have the option of monthly or yearly billing.',
      };
    case 3:
      return {
        title: 'Pick add-ons',
        description: 'Add-ons help enhance your gaming experience.',
      };
    case 4:
      return {
        title: 'Finishing up',
        description: 'Double-check everything looks OK before confirming.',
      };
    default:
      return {
        title: '',
        description: '',
      };
  }
}
