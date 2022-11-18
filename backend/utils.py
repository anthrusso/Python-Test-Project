import requests
import json

from fastapi import HTTPException


def get_weather_data(code):
    URL = "http://api.openweathermap.org/data/2.5/weather?zip={code},us&appid=655dfc390726be35679ee1f171b45301"\
        .format(code=code)
    response = requests.get(URL)
    if response.status_code != 200:
        raise HTTPException(401, detail="City not found")
    return json.loads(response.content)
