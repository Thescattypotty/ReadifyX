package org.readify.book_service.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.readify.book_service.Entity.Tag;
import org.readify.book_service.EntityRepository.TagRepository;
import org.readify.book_service.Exception.ResourceNotFoundException;
import org.readify.book_service.IService.ITagService;
import org.readify.book_service.Payload.Mapper.TagMapper;
import org.readify.book_service.Payload.Request.TagRequest;
import org.readify.book_service.Payload.Response.TagResponse;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TagService implements ITagService
{
    private final TagMapper tagMapper;
    private final TagRepository tagRepository;
    @Override
    public void saveTag(TagRequest tagRequest) {
        Tag tag = tagMapper.toTag(tagRequest);
        tagRepository.save(tag);
    }
    
    @Override
    public void updateTag(String tagId, TagRequest tagRequest) {
        if(tagRepository.existsById(UUID.fromString(tagId)))
        {
            Tag tag = tagMapper.toTag(tagRequest);
            tag.setId(UUID.fromString(tagId));
            tagRepository.save(tag);
        }else{
            throw new ResourceNotFoundException("Cannot find the Tag with id : " + tagId);
        }
    }

    @Override
    public TagResponse getTagById(String tagId) {
        return tagMapper.toTagResponse(
            tagRepository.findById(UUID.fromString(tagId))
            .orElseThrow(() -> new ResourceNotFoundException("Cannot find the Tag with id : " + tagId))  
        );
    }

    @Override
    public List<TagResponse> getAllTags() {
        return tagRepository.findAll()
            .stream().map(
                t -> tagMapper.toTagResponse(t)
            ).collect(Collectors.toList());
    }

    @Override
    public void deleteTag(String tagId) {
        if (tagRepository.existsById(UUID.fromString(tagId))) {
            tagRepository.deleteById(UUID.fromString(tagId));
        } else {
            throw new ResourceNotFoundException("Cannot find the Tag with id : " + tagId);
        }
    }
    
}
