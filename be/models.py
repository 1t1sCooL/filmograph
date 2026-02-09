from enum import Enum
from sqlalchemy import Column, Integer, String, Enum as SQLEnum
from database import Base

class FilmType(str, Enum):
    action = "боевик"
    triller = "триллер"
    comedy = "комедия"
    drama = "драма"

class Film(Base):
    __tablename__ = "films"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    image = Column(String)  # base64 encoded image
    film_type = Column(SQLEnum(FilmType))
    duration = Column(Integer)  # in minutes