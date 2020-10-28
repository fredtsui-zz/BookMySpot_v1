const faker = require('faker');

const generateClient = () => {
    const fname = faker.name.firstName();
    const lname = faker.name.lastName();
    return {
        name: fname + ' ' + lname,
        address: faker.address.streetAddress(true),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber()
    };
}

const generateOptions = () => {
    const r = faker.random.number(2);
    let type;
    if(r === 0) {
        type = 'Catering';
    } else if (r == 1) {
        type = 'Flower'
    } else {
        type = 'Entertainment'
    }

    const name = type + faker.random.hexaDecimal(5);

    return {
        name: name,
        type: type
    };
};

const generateHours = () => {
    // only generate hour during the day
    const start = 8 + faker.random.number(6);
    const end = 15 + faker.random.number(9);
    return start + ' - ' + end;
};

const generateLocation = () => {
    return {
        name: 'location' + faker.random.hexaDecimal(5),
        capacity: 20 + 5*faker.random.number(16),
        phone: faker.phone.phoneNumber(),
        price: faker.random.number(4) * 5,
        hours: generateHours(),
        address: faker.address.streetAddress(true),
        city: faker.address.city()
    }
}

const generateSuppliers = () => {
    let retval = {
        name: "",
        isCater: false,
        isFlower: false,
        isEntertainment: false
    };
    const suffix = faker.random.hexaDecimal(5);
    const type = faker.random.number(2);
    if(type === 0){
        retval.isCater = true;
        retval.name = 'Catering Service' + suffix;
    } else if (type === 2) {
        retval.isFlower = true;
        retval.name = 'Flower Shop' + suffix;
    } else {
        retval.isEntertainment = true;
        retval.name = 'Entertainment' + suffix;
    }
    return retval;
}

const generateInvitees = () => {
    const fname = faker.name.firstName();
    const lname = faker.name.lastName();
    return {
        email: faker.internet.email(fname, lname, faker.internet.domainName()),
        name: fname + ' ' + lname
    }
}


module.exports = {
    generateClient,
    generateInvitees,
    generateLocation,
    generateOptions,
    generateSuppliers
};