package org.readify.file_service.IService;


import org.readify.file_service.Request.FileRequest;
import org.readify.file_service.Response.FileResponse;

public interface IFileService {
    String storeFile(FileRequest fileRequest);
    byte[] getFile(String fileId);
    FileResponse getFileMetaData(String fileId);
    void deleteFile(String fileId);
    void updateFileDescription(String fileId , String description);
}
