package org.readify.file_service.Mapper;

import org.readify.file_service.Entity.FileMetadata;
import org.readify.file_service.Response.FileResponse;
import org.springframework.stereotype.Service;

@Service
public class FileMapper {
    
    public FileResponse fromFile(FileMetadata fileMetadata)
    {
        return new FileResponse(
            fileMetadata.getId(),
            fileMetadata.getFileName(),
            fileMetadata.getContentType(),
            fileMetadata.getSize(),
            fileMetadata.getUploadDate(),
            fileMetadata.getDescription()
        );
    }
}
