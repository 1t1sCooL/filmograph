from sqlalchemy.orm import Session
import models, schemas

def get_film(db: Session, film_id: int):
    return db.query(models.Film).filter(models.Film.id == film_id).first()

def get_films(db: Session):
    return db.query(models.Film).all()

def create_film(db: Session, film: schemas.FilmCreate):
    db_film = models.Film(**film.model_dump())
    db.add(db_film)
    db.commit()
    db.refresh(db_film)
    return db_film

def update_film(db: Session, film_id: int, film: schemas.FilmCreate):
    db_film = db.query(models.Film).filter(models.Film.id == film_id).first()
    if db_film:
        for key, value in film.model_dump().items():
            setattr(db_film, key, value)
        db.commit()
        db.refresh(db_film)
    return db_film

def delete_film(db: Session, film_id: int):
    db_film = db.query(models.Film).filter(models.Film.id == film_id).first()
    if db_film:
        db.delete(db_film)
        db.commit()
    return db_film