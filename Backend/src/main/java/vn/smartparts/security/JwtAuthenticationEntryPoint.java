package vn.smartparts.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import vn.smartparts.dto.DataResponse;
import vn.smartparts.dto.ErrorResponse;

import java.io.IOException;
import java.time.LocalDateTime;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authException)
            throws IOException, ServletException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        ErrorResponse errorResponse = new ErrorResponse(
                LocalDateTime.now(),
                HttpServletResponse.SC_UNAUTHORIZED,
                "Unauthorized",
                authException.getMessage(),
                request.getRequestURI(),
                null);

        DataResponse<ErrorResponse> dataResponse = DataResponse.error("Unauthorized");
        dataResponse.setData(errorResponse); // Reusing generic structure slightly differently or just sending error
                                             // message?
        // Let's stick to the pattern in GlobalExceptionHandler:
        // return ResponseEntity.status(status).body(new DataResponse<>(false, message,
        // errorDetails));

        // Actually DataResponse.error(msg) sets data to null.
        // We should construct it manually to include specific error details if we want
        // consistency with GlobalExceptionHandler.

        DataResponse<ErrorResponse> finalResponse = new DataResponse<>(false, "Unauthorized", errorResponse);

        objectMapper.writeValue(response.getOutputStream(), finalResponse);
    }
}
