import requests
from datetime import datetime
from fastmcp import FastMCP
from typing import Literal

mcp_server = FastMCP("Ai Assistant tools")

@mcp_server.tool
def get_current_datetime() -> str:
    """Get current datetime"""
    return str(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

@mcp_server.tool
def get_weather_data(station_names: list[Literal["warszawa", "krakow", "poznan", "mlawa", "wroclaw", "szczecin", "gdansk"]]) -> dict[str,str]:
    """Get current weather for Polish cities"""
    weather = {}
    for station_name in station_names:
        response = requests.get(f'https://danepubliczne.imgw.pl/api/data/synop/station/{station_name}')
        weather[station_name] = response.text
    return weather

if __name__ == "__main__":
    mcp_server.run(transport="http", host="127.0.0.1", port=9000)
