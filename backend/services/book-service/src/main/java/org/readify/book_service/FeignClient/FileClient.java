package org.readify.book_service.FeignClient;

import java.util.Optional;

import org.readify.book_service.Payload.Request.FileRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(
    name = "file-service",
    url = "${application.config.file-url}"
)
public interface FileClient {
    @PostMapping
    Optional<String> uploadFile(@RequestBody FileRequest fileRequest);
    
    @DeleteMapping("/delete/{fileId}")
    Optional<String> deleteFile(@PathVariable("fileId") String fileId);
}
