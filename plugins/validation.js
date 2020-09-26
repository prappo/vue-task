import Vue from 'vue';

Vue.prototype.$prappoValidator = (type, value) => {
  console.log(type);
  console.log(value);

  if (type == 'only_letters') {
    if (/^[a-zA-Z]*$/g.test(value)) {
      return {
        validation: true,
        message: 'Valid Input',
      };
    }
    return {
      validation: false,
      message: 'Only letters are allowed'
    };
  } else if (type == 'integer') {
    if (/^\\d+$/g.test(value)) {
      return {
        validation: true,
        message: 'Valid Input',
      };
    }
    return {
      validation: false,
      message: 'Only integers are allowed'
    };
  } else if (type == 'only_letter_number|max:100') {
    if (/^[^A-Za-z0-9]+/g.test(value)) {
      if (value.length <= 100) {
        return {
          validation: true,
          message: 'Valid Input',
        };
      } else {
        return {
          validation: false,
          message: 'Only letter and numbers are allowed'
        };
      }

    }
    return {
      validation: false,
      message: 'Only letter and numbers are allowed'
    };
  } else {
    return {
      validation: true,
      message: 'Validated'
    }
  }

}
