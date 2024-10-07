const messages = {
    user: {
        alreadyExists: 'User already exists',
        createdSuccessfully: 'User successfully created',
        notFound: 'User not found',
        loginSuccess: 'Successfully logged in',
        invalidCredentials: 'Invalid credentials',
        updateSuccess: 'Successfully updated',
        deleteSuccess: 'Successfully deleted',
        profileRetrieved: 'Profile info is getting',
        updateFail:'',
        appointmentsRetrieved: 'Appointments are getting',
    },
    doctor: {
        notFound: 'No Doctor found',
        updateSuccess: 'Successfully updated',
        updateFail: 'Failed to update',
        deleteSuccess: 'Successfully deleted',
        deleteFail: 'Failed to delete',
        profileSuccess: 'Doctor found',
        profileFail: 'Something went wrong, cannot get',
        found: 'Doctor found',
        doctorsFound: 'Doctors found',
    },
    booking: {
        paymentSuccess: 'Successfully paid',
        paymentError: 'Error creating checkout session',
    },
    review: {
        submitted: 'Review submitted',
        notFound: 'Not found',
        success: 'Successful',
    },
    error: {
        serverError: 'Internal server error, Try again',
        updateFailed: 'Failed to update',
        deleteFailed: 'Failed to delete',
        loginFailed: 'Failed to Login',
        cannotGet: 'Something went wrong, cannot get',
    }
};

export default messages;