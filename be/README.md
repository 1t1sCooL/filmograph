Для запуска

```commandline
docker-compose up -d
```

Для загрузки примеров фильмов в БД:

**Windows (PowerShell)** — без установки Python:

```powershell
.\upload.ps1
```

Если скрипт блокируется, выполните один раз: `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`

**Linux / macOS (или Git Bash на Windows):**

```commandline
./upload.sh
```

Если после клона на сервере скрипт не запускается, выполните один раз: `chmod +x upload.sh`

**Альтернатива (если установлен Python):** `pip install requests` и `python upload.py`

После загрузки фильмы появятся по адресу http://localhost:8000/films/
