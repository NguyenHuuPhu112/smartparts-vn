package vn.smartparts.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DataResponse<T> {
    private boolean success;
    private String message;
    private T data;

    public static <T> DataResponse<T> success(T data) {
        return new DataResponse<>(true, "Success", data);
    }

    public static <T> DataResponse<T> success(String message, T data) {
        return new DataResponse<>(true, message, data);
    }

    public static <T> DataResponse<T> error(String message) {
        return new DataResponse<>(false, message, null);
    }
}
