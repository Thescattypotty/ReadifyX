package org.readify.book_service.Enum;

public enum EGenre {
    Fiction("fiction_image"),
    NonFiction("nonfiction_image"),
    Mystery("mystery_image"),
    Thriller("thriller_image"),
    Fantasy("fantasy_image"),
    ScienceFiction("science_fiction_image"),
    Romance("romance_image"),
    Horror("horror_image"),
    Historical("historical_image"),
    Adventure("adventure_image"),
    Biography("biography_image"),
    Autobiography("autobiography_image"),
    Memoir("memoir_image"),
    SelfHelp("self_help_image"),
    Poetry("poetry_image"),
    Drama("drama_image"),
    Comics("comics_image"),
    GraphicNovel("graphic_novel_image"),
    YoungAdult("young_adult_image"),
    Children("children_image"),
    NewAdult("new_adult_image"),
    Dystopian("dystopian_image"),
    Paranormal("paranormal_image"),
    UrbanFantasy("urban_fantasy_image"),
    HistoricalFiction("historical_fiction_image");

    private String imagePathName;

    EGenre(String imagePathName) {
        this.imagePathName = imagePathName;
    }

    public String getImagePathName() {
        return imagePathName;
    }
}
