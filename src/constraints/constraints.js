import { validate } from 'validate.js'

const constraints = {
    confirmPassword: {
        presence: true,
        equality: "password",
        length: {
            minimum: 1,
            maximum: 20
        }
    },
    prefix: {
        presence: true,
        length: {
            minimum: 1
        }
    },
    email: {
        email: true,
        presence: true,
    },
    password: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 20
        }
    },
    title: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 20
        }
    },
    description: {
        presence: true,
        length: {
            minimum: 0,
            maximum: 140
        }
    },
    category_title: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 15
        }
    },
    category_description: {
        presence: true,
        length: {
            minimum: 0,
            maximum: 60
        }
    },
    category: {
        presence: true,
        length: {
            minimum: 5
        }
    },
    price: {
        presence: true,
        numericality: {
            greaterThan: 0
        }
    },
    discounted: {

    },
    type: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 6
        }
    },
    mongoUrl: {
        url: {
            scheme: ['mongodb']
        }
    },
    currencyCode: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 3
        }
    },
    currencySymbol: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 3
        }
    },
    reason: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 30
        }
    },
    optionTitle: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 30
        }
    },
    optionDescription: {
        length: {
            minimum: 0,
            maximum: 60
        }
    },
    optionPrice: {
        presence: true,
        numericality: {
            greaterThanOrEqualTo: 0
        }
    },
    addonTitle: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 60
        }
    },
    addonDescription: {
        length: {
            minimum: 0,
            maximum: 60
        }
    },
    addonQuantityMinimum: {
        presence: true,
        numericality: {
            greaterThanOrEqualTo: 0
        }
    },
    addonQuantityMaximum: {
        presence: true,
        numericality: {
            greaterThanOrEqualTo: 1
        }
    },
    tag: {
        length: {
            minimum: 0,
            maximum: 60
        }
    },
    stock: {
        presence: true,
        numericality: {
            onlyInteger: true,
            greaterThanOrEqualTo: 0
        }
    },
    code: {
        presence: true,
        length: {
            minimum: 3,
            maximum: 15
        }
    },
    discount: {
        presence: true,
        numericality: {
            greaterThan: 0,
            lessThan: 100
        }
    },
    phone : {
        presence: true,
        length : {
            minimum: 0,
            maximum: 20
        }
    },
    firstName: {
        presence: true,
        length: {
            minimum: 0,
            maximum: 60
        }
    },
    lastName: {
        presence: true,
        length: {
            minimum: 0,
            maximum: 60
        }
    },
    fname: {
        presence: true,
        length: {
            minimum: 0,
            maximum: 60
        }
    },
    lname: {
        presence: true,
        length: {
            minimum: 0,
            maximum: 60
        }
    },
    checkbox: {
        presence: {
          message: "^You need to check the checkbox"
        },
        inclusion: {
          within: [true],
          message: "^You need to check the checkbox"
        }
    }
}

export const validateFunc = (value, constraint) => {
    return validate(value, { [constraint]: constraints[constraint] })
}
