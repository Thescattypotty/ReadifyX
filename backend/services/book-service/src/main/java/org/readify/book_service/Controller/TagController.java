package org.readify.book_service.Controller;

import java.util.List;

import org.readify.book_service.Payload.Request.TagRequest;
import org.readify.book_service.Payload.Response.TagResponse;
import org.readify.book_service.Service.TagService;
import org.springframework.http.HttpStatus;
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
import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/tag")
public class TagController {

    private final TagService tagService;

    @PostMapping
    public ResponseEntity<Void> saveTag(@RequestBody @Valid TagRequest tagRequest) {
        tagService.saveTag(tagRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<TagResponse>> getAllTags() {
        return ResponseEntity.ok(tagService.getAllTags());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TagResponse> getTagById(@PathVariable("id") String tagId) {
        return ResponseEntity.ok(tagService.getTagById(tagId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateTag(@PathVariable("id") String tagId,
            @RequestBody @Valid TagRequest tagRequest) {
        tagService.updateTag(tagId, tagRequest);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTag(@PathVariable("id") String tagId) {
        tagService.deleteTag(tagId);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }
}
