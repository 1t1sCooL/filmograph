from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

import crud, models, schemas
from database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/films/", response_model=schemas.Film)
def create_film(film: schemas.FilmCreate, db: Session = Depends(get_db)):
    return crud.create_film(db=db, film=film)

@app.get("/films/", response_model=List[schemas.Film])
def read_films(db: Session = Depends(get_db)):
    films = crud.get_films(db)
    return films

@app.get("/films/{film_id}", response_model=schemas.Film)
def read_film(film_id: int, db: Session = Depends(get_db)):
    db_film = crud.get_film(db, film_id=film_id)
    if db_film is None:
        raise HTTPException(status_code=404, detail="Film not found")
    return db_film

@app.put("/films/{film_id}", response_model=schemas.Film)
def update_film(film_id: int, film: schemas.FilmCreate, db: Session = Depends(get_db)):
    db_film = crud.update_film(db, film_id=film_id, film=film)
    if db_film is None:
        raise HTTPException(status_code=404, detail="Film not found")
    return db_film

@app.delete("/films/{film_id}", response_model=schemas.Film)
def delete_film(film_id: int, db: Session = Depends(get_db)):
    db_film = crud.delete_film(db, film_id=film_id)
    if db_film is None:
        raise HTTPException(status_code=404, detail="Film not found")
    return db_film