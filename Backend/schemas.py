from typing import List, Optional
from pydantic import BaseModel
from pydantic.types import constr

class User(BaseModel):
    id: int
    email: str
    f_name: str
    l_name: str
    presentation: Optional[constr(max_length=512)] = "" 

    class Config:
        orm_mode = True

class UserCreate(BaseModel):
    email: str
    f_name: str
    l_name: str

    class Config:
        orm_mode = True

class UserDelete(BaseModel):
    email: str

    class Config:
        orm_mode = True