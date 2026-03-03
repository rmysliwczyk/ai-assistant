# AI Assistant

Agentic AI Assistant made with Ollama, FastAPI, and HTML+CSS+JS Check it out [here](http://assistant.mysliwczykrafal.pl)

## 🌟 Highlights

- 🤖 Tool calling capabilities
- 🎭 Custom System prompt for defining the Assistant's behaviour
- 🌤️ Access to real time public weather API data from [IMGW.pl](https://danepubliczne.imgw.pl/pl/apiinfo)
- 🕒 Accurate date and time access
- 🌙 Dark/Light mode for the frontend, depending on the system preferences
- 📝 Adding documents to context via RAG (Coming soon...)
  
## 💻 Technologies used
- <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/refs/heads/main/icons/Python-Light.svg" width=24/> **Python** for the programming language
- <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/refs/heads/main/icons/FastAPI.svg" width=24/> **FastAPI** for the backend
- <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/ollama.svg" width=24/> **Ollama** for AI capabilities
- <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/refs/heads/main/icons/HTML.svg" width=24/> <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/refs/heads/main/icons/CSS.svg" width=24/> <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/refs/heads/main/icons/JavaScript.svg" width=24/> **HTML, CSS, JS** for the frontend
- <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/refs/heads/main/icons/Jenkins-Light.svg" width=24/> **Jenkins** for CI/CD
- <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/refs/heads/main/icons/Docker.svg" width=24/> **Docker** and **Docker Compose** for CI/CD

## 👉 Try it!

Self hosted here: [AI Assistant](http://assistant.mysliwczykrafal.pl)
Ask it about the weather and time to check out the agentic capabilities.

## 📥 Deployment
If you wish to deploy the app yourself follow these steps:

- Install [Docker](https://docs.docker.com/engine/install/) with Docker Compose or [Podman](https://podman.io/docs/installation) with Podman Compose. If you use Podman, replace `docker` command with `podman` in the following steps.
- `git clone` the repository or download and extract the .zip with the source code.
- `cd /directory/with/the/sourcecode/backend`
- `mv .env.example .env`
- Add your Ollama API key to .env
- `cd ../frontend`
- Open the `script.js` file
- Edit CHAT_WEBSOCKET_URL to point to where you'll deploy the assistant. (For testing locally this would be "ws://127.0.0.1:8000/chat")
- `cd ..`
- `docker compose up  --build -d`
- Visit `http://127.0.0.1:8888` to access the login page

## 📝 Project details

Description of work organization and demo deployment details

No AI was used for the code or documentation of this project. I'm not opposed to using AI tools in the right context, but for the purpose of my personal portfolio projects I've decided not to use them.

### Tools and resources

#### Project management

- <img src="https://raw.githubusercontent.com/LelouchFR/skill-icons/refs/heads/main/assets/git-auto.svg" width=24/> **Git** for version control
- <img src="https://raw.githubusercontent.com/LelouchFR/skill-icons/refs/heads/main/assets/uml-auto.svg" width=24/> **UML** for Use case diagram
- <img src="https://raw.githubusercontent.com/LelouchFR/skill-icons/refs/heads/main/assets/jira-auto.svg" width=24/> **Jira** for tracking tasks and bugs

#### Deployment

- <img src="https://raw.githubusercontent.com/LelouchFR/skill-icons/refs/heads/main/assets/linux-auto.svg" width=24/> Local homelab server running **Debian Linux**
- 🌎 **Dynamic DNS** with [Dynu](https://www.dynu.com) for hosting with dynamic IP
- <img src="https://github.com/LelouchFR/skill-icons/blob/main/assets/nginx.svg" width=24/> **NGINX** for reverse proxy
- <img src="https://raw.githubusercontent.com/LelouchFR/skill-icons/refs/heads/main/assets/github-auto.svg" width=24/> **GitHub webhook** for triggering Jenkins build and deployment

