function errorHandler(err, req, res, next) {
    // Set the status code to the error status code or default to 500
    res.status(err.status || 500);

    // Send JSON response
    res.json({
        error: {
            message: err.message,
        }
    });
}

export {errorHandler}