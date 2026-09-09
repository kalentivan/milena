import json
from pydantic import BaseModel, ConfigDict, Field, field_validator

class ArtworkOut(BaseModel):
    id: str; slug: str; title: str; year: int; width_cm: float; height_cm: float; depth_cm: float | None
    technique: str; material: str; series: str; description: str; short_description: str; status: str; image_url: str; detail_images: list[str] = []; featured: bool
    model_config = ConfigDict(from_attributes=True)

    @classmethod
    def from_orm_artwork(cls, obj):
        return cls(
            id=obj.id, slug=obj.slug, title=obj.title, year=obj.year, width_cm=obj.width_cm, height_cm=obj.height_cm,
            depth_cm=obj.depth_cm, technique=obj.technique, material=obj.material, series=obj.series,
            description=obj.description, short_description=obj.short_description, status=obj.status,
            image_url=obj.image_url, detail_images=json.loads(obj.detail_images_json or "[]"), featured=obj.featured,
        )

class InquiryCreate(BaseModel):
    name: str = Field(min_length=1, max_length=180)
    contact: str = Field(min_length=3, max_length=250)
    message: str = Field(default="", max_length=4000)
    artwork_slug: str | None = None
