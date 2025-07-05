function sendResponse(res, status = true, data = null, message = 'Success', code = 200) {
    const response = {
        status,
        message,
        data,
    };
    return res.status(code).json(response);
}

function internalServerError(res, message = 'Internal server error') {
    return res.status(500).json({
        status: false,
        message,
    });
}

function unauthorizedActionError(res, message = 'Not authorized') {
    return res.status(401).json({
        status: false,
        message,
    });
}

export { sendResponse, internalServerError, unauthorizedActionError };