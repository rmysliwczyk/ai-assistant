from fastapi import FastAPI, WebSocket
import ollama
from dotenv import load_dotenv
import os

load_dotenv()

SELECTED_MODEL = "gemma3:27b"
API_KEY = os.environ.get("OLLAMA_API_KEY")

app = FastAPI()

@app.get("/status", status_code=200)
def status():
    return None

@app.websocket("/chat")
async def chat(websocket: WebSocket):
    await websocket.accept()
    messages = await websocket.receive_json()
    async for chunk in await ollama.AsyncClient(host="https://ollama.com", headers={"Authorization": API_KEY}).chat(model=SELECTED_MODEL, messages=messages, stream=True):
        await websocket.send_text(chunk['message']['content'])
    await websocket.close()

