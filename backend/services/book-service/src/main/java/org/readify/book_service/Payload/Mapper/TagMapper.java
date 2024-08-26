package org.readify.book_service.Payload.Mapper;

import org.readify.book_service.Entity.Tag;
import org.readify.book_service.Payload.Request.TagRequest;
import org.readify.book_service.Payload.Response.TagResponse;
import org.springframework.stereotype.Service;

@Service
public class TagMapper {
    
    public Tag toTag(TagRequest tagRequest)
    {
        return Tag.builder()
            .name(tagRequest.name())
            .build();
    }
    public TagResponse toTagResponse(Tag tag)
    {
        return new TagResponse(
            tag.getId().toString(),
            tag.getName(),
            tag.getCreatedAt()
        );
    }
}
