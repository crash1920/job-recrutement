const validationRules = {
  firstName: {
    required: true,
  },
  lastName: {
    required: true,
  },
  username: {
    required: true,
  },
  jobTitle: {
    required: {
      value: true,
      message: 'Job title is required',
    },
    pattern: {
      value: /^[^\d]*$/,
      message: 'Job title cannot contain numbers',
    },
  },
  email: {
    required: true,
    pattern: /^\S+@\S+\.\S+$/i,
  },
  password: {
    required: true,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  },
  confirmPassword: {
    required: true,
    minLength: 6,
    validate: (value) => value === (document.getElementById('password') as HTMLInputElement)?.value,
  },
  mobileNumber: {
    required: true,
    pattern: /^(\+33|0)[1-9](\d{2}){4}$/,
  },
  usernameOrEmail: {
    required: true,
  },
  startDate: {
    required: true,
    validate: {
      notPastDate: (value) => {
        const currentDate = new Date().toISOString().split('T')[0];
        return value <= currentDate || 'Date must not surpass the current date';
      },
    },
  },
  endDate: {
    required: true,

  },
  date: {
    required: true,
    validate: {
      notPastDate: (value) => {
        const currentDate = new Date().toISOString().split('T')[0];
        return value <= currentDate || 'Date must not surpass the current date';
      },
    },
  },
  country: {
    required: true,
  },
  titleEducation: {
    required: true,
  },
  links: {
    validate: {
      isFacebookLink: (value) => {
        if (value.trim() === '') return true; // Allow empty value
        const facebookRegex = /^(https?:\/\/)?(www\.)?facebook\.com\/.*/i;
        return facebookRegex.test(value);
      },
      isTwitterLink: (value) => {
        if (value.trim() === '') return true; // Allow empty value
        const twitterRegex = /^(https?:\/\/)?(www\.)?twitter\.com\/.*/i;
        return twitterRegex.test(value);
      },
      isGithubLink: (value) => {
        if (value.trim() === '') return true; // Allow empty value
        const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/.*/i;
        return githubRegex.test(value);
      },
    },
  },
  description: {
    required: true,
  },
  titleSkill: {
    required: true,
  },
  titleResponsibility: {
    required: true,
  },
  percentageSkill: {
    required: true,
  },
  percentageLanguage: {
    required: true,
  },
  contractType: {
    required: true,
  },
  titleJobExperience: {
    required: true,
  },
  titleLanguage: {
    required: true,
  },
  CertifTitle: {
    required: true,
  },
  university: {
    required: true,
  },
  familyMembers: {
    required: true,
    pattern: {
      value: /^[0-9]+$/,
      message: 'Job experience must be a number',
    },
  },
  jobXp: {
    required: true,
    pattern: {
      value: /^[0-9]+$/,
      message: 'Job experience must be a number',
    },
  },
  openings: {
    required: true,
    pattern: {
      value: /^[0-9]+$/,
      message: 'Job openings must be a number',
    },
  },
  birthCity: {
    required: true,
    pattern: /^[^0-9]*$/,
    message: ' invalid birthcity',
  },
  salaryRange: {
    required: 'Salary range is required',
    pattern: {
      value: /^\$?(\d+(,\d{3})*(\.\d+)?)\s?-\s?\$?(\d+(,\d{3})*(\.\d+)?)$/,
      message: 'Invalid salary range format',
    },
    validate: (value) => {
      const [minValue, maxValue] = value.split('-').map((item) => Number(item.trim().replace(/[$,]/g, '')));

      if (minValue >= maxValue) {
        return 'Minimum value must be strictly lesser than the maximum value';
      }

      return true;
    },
  },

};

export default validationRules;
