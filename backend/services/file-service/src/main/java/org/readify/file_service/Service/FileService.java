package org.readify.file_service.Service;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.bson.types.ObjectId;
import org.readify.file_service.Entity.FileMetadata;
import org.readify.file_service.Exception.FileException;
import org.readify.file_service.IService.IFileService;
import org.readify.file_service.Mapper.FileMapper;
import org.readify.file_service.Request.FileRequest;
import org.readify.file_service.Response.FileResponse;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StreamUtils;

import com.mongodb.client.gridfs.model.GridFSFile;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FileService implements IFileService
{
    private final GridFsTemplate gridFsTemplate;
    private final GridFsOperations gridFsOperations;
    private final MongoTemplate mongoTemplate;
    private final FileMapper fileMapper;

    @Override
    @Transactional
    public String storeFile(FileRequest fileRequest){
        try {
            ObjectId fileId = gridFsTemplate.store(fileRequest.file().getInputStream(),
                    fileRequest.file().getOriginalFilename(), fileRequest.file().getContentType());

            FileMetadata metadata = new FileMetadata(
                fileId.toString(),
                fileRequest.file().getOriginalFilename(),
                fileRequest.file().getContentType(),
                fileRequest.file().getSize(),
                LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),
                fileRequest.description());
            mongoTemplate.save(metadata);
            return fileId.toString();
        } catch (IOException e) {
            throw new FileException("Failed Storing file");
        }
        
    }

    @Override
    public byte[] getFile(String fileId){
        GridFSFile gridFSFile = gridFsTemplate.findOne(new Query(Criteria.where("_id").is(fileId)));
        if (gridFSFile != null && gridFSFile.getMetadata() != null) {
            try {
                InputStream inputStream = gridFsOperations.getResource(gridFSFile).getInputStream();
                return StreamUtils.copyToByteArray(inputStream);
            } catch (IOException e) {
                throw new FileException("Failed to render file as Byte[]");
            }
        } else {
            throw new FileException("File not found");
        }
    }

    @Override
    public FileResponse getFileMetaData(String fileId) {
        return fileMapper.fromFile(mongoTemplate.findById(fileId, FileMetadata.class));
    }
    @Override
    public void deleteFile(String fileId){
        gridFsTemplate.delete(new Query(Criteria.where("_id").is(fileId)));
        long deletedCount = mongoTemplate.remove(new Query(Criteria.where("_id").is(fileId)), FileMetadata.class)
                .getDeletedCount();
        if(deletedCount == 0)
        {
            throw new FileException("File Metadata not found or already deleted");
        }
    }
    @Override
    public void updateFileDescription(String fileId , String description)
    {
        FileMetadata fileMetadata = mongoTemplate.findById(fileId, FileMetadata.class);

        if (fileMetadata == null) {
            throw new FileException("File metadata not found for ID: " + fileId);
        }
        fileMetadata.setDescription(description);
        mongoTemplate.save(fileMetadata);
    }    
}
