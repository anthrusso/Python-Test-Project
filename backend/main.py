from fastapi import FastAPI, Body, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import time
from jwt_auth_handler import signJWT, JWTBearer
from utils import get_weather_data

app = FastAPI()
# user_handler = UserDataHandler()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/get-weather")
def get_weather(data=Body(...)):
    zip_code = data.get("zip_code", "")
    if zip_code == "":
        raise HTTPException(401, detail="zip code not found")
    data = get_weather_data(zip_code)

    return {
        "data": data,
        "error": False
    }


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get('/time')
def get_current_time():
    return {'time': time.time()}


# sudo kill -9 `sudo lsof -t -i:8000`
if __name__ == "__main__":
    uvicorn.run('main:app', host='0.0.0.0', port=8000, reload=True)