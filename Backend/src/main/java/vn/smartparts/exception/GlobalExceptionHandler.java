package vn.smartparts.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import vn.smartparts.dto.DataResponse;
import vn.smartparts.dto.ErrorResponse;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<DataResponse<ErrorResponse>> handleNotFound(NoSuchElementException ex,
            HttpServletRequest request) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage(), request, null);
    }

    @ExceptionHandler({ IllegalArgumentException.class, HttpMessageNotReadableException.class })
    public ResponseEntity<DataResponse<ErrorResponse>> handleBadRequest(Exception ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage(), request, null);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<DataResponse<ErrorResponse>> handleValidation(MethodArgumentNotValidException ex,
            HttpServletRequest request) {
        List<ErrorResponse.FieldError> fieldErrors = ex.getBindingResult().getFieldErrors()
                .stream()
                .map(f -> new ErrorResponse.FieldError(f.getField(), resolveMessage(f)))
                .toList();
        return buildResponse(HttpStatus.BAD_REQUEST, "Validation failed", request, fieldErrors);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<DataResponse<ErrorResponse>> handleAuth(AuthenticationException ex,
            HttpServletRequest request) {
        return buildResponse(HttpStatus.UNAUTHORIZED, ex.getMessage(), request, null);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<DataResponse<ErrorResponse>> handleAccessDenied(AccessDeniedException ex,
            HttpServletRequest request) {
        return buildResponse(HttpStatus.FORBIDDEN, ex.getMessage(), request, null);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<DataResponse<ErrorResponse>> handleResourceNotFound(ResourceNotFoundException ex,
            HttpServletRequest request) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage(), request, null);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<DataResponse<ErrorResponse>> handleBadRequestCustom(BadRequestException ex,
            HttpServletRequest request) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage(), request, null);
    }

    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<DataResponse<ErrorResponse>> handleConflict(ConflictException ex,
            HttpServletRequest request) {
        return buildResponse(HttpStatus.CONFLICT, ex.getMessage(), request, null);
    }

    @ExceptionHandler(org.springframework.web.HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<DataResponse<ErrorResponse>> handleMethodNotSupported(
            org.springframework.web.HttpRequestMethodNotSupportedException ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.METHOD_NOT_ALLOWED, ex.getMessage(), request, null);
    }

    @ExceptionHandler(org.springframework.web.bind.MissingServletRequestParameterException.class)
    public ResponseEntity<DataResponse<ErrorResponse>> handleMissingParam(
            org.springframework.web.bind.MissingServletRequestParameterException ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage(), request, null);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<DataResponse<ErrorResponse>> handleOther(Exception ex, HttpServletRequest request) {
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error: " + ex.getMessage(), request,
                null);
    }

    private ResponseEntity<DataResponse<ErrorResponse>> buildResponse(HttpStatus status,
            String message,
            HttpServletRequest request,
            List<ErrorResponse.FieldError> fieldErrors) {
        ErrorResponse errorDetails = new ErrorResponse(
                LocalDateTime.now(),
                status.value(),
                status.getReasonPhrase(),
                message,
                request.getRequestURI(),
                fieldErrors);
        return ResponseEntity.status(status).body(new DataResponse<>(false, message, errorDetails));
    }

    private String resolveMessage(FieldError fieldError) {
        if (fieldError.getDefaultMessage() != null) {
            return fieldError.getDefaultMessage();
        }
        return "Invalid value";
    }
}
