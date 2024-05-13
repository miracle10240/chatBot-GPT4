import openai
from fastapi import FastAPI
from fastapi import BackgroundTasks, Form, FastAPI, Request, status
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

openai.api_key = "YOUR KEY IS HERE!"

templates = Jinja2Templates(directory=".")
app = FastAPI()
app.mount('/public', StaticFiles(directory='public', html=True), name='static')


@app.get("/", response_class=HTMLResponse)
def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})
@app.post("/openai/gpt4")
async def process_data(data: dict):
    prompt = data.get('prompt')
    COMPLETIONS_MODEL = "gpt-4"                #GPT-3
    message = [{"role": "user", "content": prompt}]
    response = openai.ChatCompletion.create(
            messages=message,
            temperature=0.2,
            max_tokens=1000,
            frequency_penalty=0.0,
            model=COMPLETIONS_MODEL
        )["choices"][0].get("message").get("content").strip(" \n")

   
    return {"result": response}
