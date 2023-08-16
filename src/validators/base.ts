import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    // eslint-disable-next-line
    required: '${path} is required',
  },
  string: {
    /* eslint-disable */
    min: '${path} must not enter less than ${min} characters',
    max: '${path} do not enter more than ${max} characters',
    /* eslint-enable */
  },
  number: {
    /* eslint-disable */
    min: '${path} must be ${min} or more',
    max: '${path} limit ${max}',
    /* eslint-enable */
  },
});


export default Yup;
