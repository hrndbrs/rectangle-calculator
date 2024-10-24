from fastapi import FastAPI
from models.rectangle import Rectangle
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/area")
def calculate_area(base: float, height: float):
    rectangle = Rectangle(base, height)

    return {"data": rectangle.area}


@app.get("/perimeter")
def calculate_perimeter(base: float, height: float):
    rectangle = Rectangle(base, height)
    return {"data": rectangle.perimeter}
