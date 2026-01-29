class ApiResponse {
  static success(res, data, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }
  
  static error(res, message = 'Error', statusCode = 500, error = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      ...(error && process.env.NODE_ENV === 'development' && { error: error.message })
    });
  }
  
  static created(res, data, message = 'Created successfully') {
    return res.status(201).json({
      success: true,
      message,
      data
    });
  }
  
  static notFound(res, message = 'Resource not found') {
    return res.status(404).json({
      success: false,
      message
    });
  }
  
  static unauthorized(res, message = 'Unauthorized') {
    return res.status(401).json({
      success: false,
      message
    });
  }
  
  static forbidden(res, message = 'Forbidden') {
    return res.status(403).json({
      success: false,
      message
    });
  }
  
  static badRequest(res, message = 'Bad request', errors = null) {
    return res.status(400).json({
      success: false,
      message,
      ...(errors && { errors })
    });
  }
}

module.exports = ApiResponse;