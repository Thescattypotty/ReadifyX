package org.readify.file_service.Controller;


import org.readify.file_service.Request.FileRequest;
import org.readify.file_service.Response.FileResponse;
import org.readify.file_service.Service.FileService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/file")
public class FileController {

    private final FileService fileService;


    @PostMapping
    public ResponseEntity<String> uploadFile(@RequestBody @Valid FileRequest fileRequest){
        return ResponseEntity.ok(fileService.storeFile(fileRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FileResponse> getFileById(String fileId)
    {
        return ResponseEntity.ok(fileService.getFileMetaData(fileId));
    }
    
    @GetMapping("/download/{fileId}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable("fileId") String fileId)
    {
        byte[] fileData = fileService.getFile(fileId);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentLength(fileData.length);
        return new ResponseEntity<>(fileData, headers , HttpStatus.OK);
    }

    @PutMapping("/update/{fileId}")
    public ResponseEntity<Void> updateFileDescription(@PathVariable("fileId") String fileId , @RequestBody @Valid @NotNull @NotBlank String description)
    {
        fileService.updateFileDescription(fileId, description);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{fileId}")
    public ResponseEntity<String> deleteFile(@PathVariable("fileId") String fileId)
    {
        fileService.deleteFile(fileId);
        return ResponseEntity.ok("File deleted successfully");
    }
}
