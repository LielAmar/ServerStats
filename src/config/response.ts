interface response {
  success: boolean
  message: string
  data?: object
}

/**
 * Creates a response object for the various endpoints
 * 
 * @param success   Whether the request was successfull
 * @param message   Message of the response
 * @param data      <Optional> Object to return
 * @returns         A response object
 */
const createResponse = (success: boolean, message: string, data?: object | null): response => {
  return {
    success,
    message,
    data: (data !== null ? data : {})
  }
}

export { createResponse }