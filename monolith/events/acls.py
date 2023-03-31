import json
import requests
import os

PEXELS_API_KEY = os.environ["PEXELS_API_KEY"]
OPEN_WEATHER_API_KEY = os.environ["OPEN_WEATHER_API_KEY"]


# <----- from solution ----->
def get_photo(city, state):
    headers = {"Authorization": PEXELS_API_KEY}
    params = {
        "per_page": 1,
        "query": f"downtown {city} {state}",
    }
    url = "https://api.pexels.com/v1/search"
    response = requests.get(url, params=params, headers=headers)
    content = json.loads(response.content)
    try:
        return {"picture_url": content["photos"][0]["src"]["original"]}
    except (KeyError, IndexError):
        return {"picture_url": None}


def get_weather_data(city, state):
    params = {
        "q": f"{city},{state},US",
        "limit": 1,
        "appid": OPEN_WEATHER_API_KEY,
    }
    url = "http://api.openweathermap.org/geo/1.0/direct"
    response = requests.get(url, params=params)
    content = json.loads(response.content)

    try:
        latitude = content[0]["lat"]
        longitude = content[0]["lon"]
    except (KeyError, IndexError):
        return None

    params = {
        "lat": latitude,
        "lon": longitude,
        "appid": OPEN_WEATHER_API_KEY,
        "units": "imperial",
    }
    url = "https://api.openweathermap.org/data/2.5/weather"
    response = requests.get(url, params=params)
    content = json.loads(response.content)

    try:
        return {
            "description": content["weather"][0]["description"],
            "temp": content["main"]["temp"],
        }
    except (KeyError, IndexError):
        return None

# <------------- mine ---------------->
# def get_image(city, state):
#     url = f"https://api.pexels.com/v1/search?query={city}+{state}"
#     headers = {
#         "Authorization": PEXELS_API_KEY,
#     }
#     resp = requests.get(url, headers=headers)
#     return resp.json()["photos"][0]["src"]["original"]

# def get_coord(city, state):
#     url = f"http://api.openweathermap.org/geo/1.0/direct?q={city},{state},US&limit=5&appid={OPEN_WEATHER_API_KEY}"
#     resp = requests.get(url)
#     return {"lat": resp.json()[0]["lat"], "lon": resp.json()[0]["lon"]}


# def get_weather(lat, lon):
#     url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=imperial&appid={OPEN_WEATHER_API_KEY}"
#     resp = requests.get(url)
#     return {
#         "description": resp.json()["weather"][0]["description"],
#         "temperature": resp.json()["main"]["temp"],
#     }
