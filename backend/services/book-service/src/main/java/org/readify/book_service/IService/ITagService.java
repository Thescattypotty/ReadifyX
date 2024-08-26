package org.readify.book_service.IService;

import java.util.List;

import org.readify.book_service.Payload.Request.TagRequest;
import org.readify.book_service.Payload.Response.TagResponse;

public interface ITagService {
    void saveTag(TagRequest tagRequest);
    TagResponse getTagById(String tagId);
    List<TagResponse> getAllTags();
    void updateTag(String tagId , TagRequest tagRequest);
    void deleteTag(String tagId);
}
