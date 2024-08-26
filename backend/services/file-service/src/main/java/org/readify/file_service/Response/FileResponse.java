package org.readify.file_service.Response;

public record FileResponse(
    String id,
    String fileName,
    String contentType,
    long size,
    String uploadDate,
    String description
) {

}
