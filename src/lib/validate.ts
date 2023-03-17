interface ErrorValues {
    email?: string;
    password?: string;
    cpassword?: string;
    username?: string;
}

export function validateLogin(values: ErrorValues) {
    const errors: ErrorValues = {};

    // email validation
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email='Invalid email address';
    }

    // password validation
    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = 'Must be between 8 and 20 characters'
    } else if (values.password.includes(' ')) {
        errors.password = 'Invalid password: Please remove empty spaces'
    }

    return errors;
}

export function validateSignup(values: ErrorValues) {
    const errors: ErrorValues = {};

    if (!values.username) {
        errors.username = 'Required';
    } else if (values.username.length < 4 || values.username.length > 30) {
        errors.username = 'Must be between 4 and 30 characters'
    } else if (values.username.includes(' ')) {
        errors.username = 'Invalid username: Please remove empty spaces'
    }
    
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email='Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = 'Must be between 8 and 20 characters'
    } else if (values.password.includes(' ')) {
        errors.password = 'Invalid password: Please remove any empty spaces'
    }

    if (!values.cpassword) {
        errors.cpassword = 'Required';
    } else if (values.cpassword !== values.password) {
        errors.cpassword = 'Passwords do not match'
    }

    return errors;
}