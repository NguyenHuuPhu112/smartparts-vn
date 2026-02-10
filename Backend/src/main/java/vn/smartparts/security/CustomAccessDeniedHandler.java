package vn.smartparts.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;
import vn.smartparts.dto.DataResponse;
import vn.smartparts.dto.ErrorResponse;

import java.io.IOException;
import java.time.LocalDateTime;

@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
            AccessDeniedException accessDeniedException)
            throws IOException, ServletException {
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        ErrorResponse errorResponse = new ErrorResponse(
                LocalDateTime.now(),
                HttpServletResponse.SC_FORBIDDEN,
                "Forbidden",
                accessDeniedException.getMessage(),
                request.getRequestURI(),
                null);

        DataResponse<ErrorResponse> finalResponse = new DataResponse<>(false, "Access Denied", errorResponse);

        objectMapper.writeValue(response.getOutputStream(), finalResponse);
    }
}
