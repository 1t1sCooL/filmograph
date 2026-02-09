from enum import Enum
from pydantic import BaseModel
from typing import Optional

class FilmType(str, Enum):
    action = "боевик"
    triller = "триллер"
    comedy = "комедия"
    drama = "драма"

class FilmBase(BaseModel):
    name: str
    description: Optional[str] = None
    image: str  # base64 encoded image
    film_type: FilmType
    duration: int  # in minutes

class FilmCreate(FilmBase):
    pass

class Film(FilmBase):
    id: int

    class Config:
        from_attributes = True