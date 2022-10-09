from typing import List

from fastapi import Depends, FastAPI, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import update
from sqlalchemy.sql.functions import mode
from sqlalchemy.sql.operators import exists
from sqlalchemy.sql.sqltypes import Integer
from fastapi.middleware.cors import CORSMiddleware

import models, schemas
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = "*",
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int , db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    return user

@app.put("/users/", response_model=schemas.User)
def update_user(request: schemas.User, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id==request.id)
    if not user.first():
        return q
    else:
        user.update(request.dict())
        db.commit()
        return request

@app.get("/users/", response_model=List[schemas.User])
def read_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users

@app.post("/users/", status_code=200, response_model=schemas.User)
def create_user(request: schemas.UserCreate, db: Session = Depends(get_db)):
    new_user = models.User(email=request.email, f_name=request.f_name, l_name=request.l_name, presentation="No presenation")
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.delete("/users/", response_model=schemas.UserDelete)
def delete_user(r: schemas.UserDelete, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == r.email).first()
    db.delete(user)
    db.commit()
    return user