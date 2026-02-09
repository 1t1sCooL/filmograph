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

---

### Kubernetes

При деплое через `kubectl apply -k kubernetes/` загрузка примеров выполняется автоматически: в манифестах есть **Job** `seed-films`, который после старта backend один раз запускает `upload.py` и заполняет БД. Job использует тот же образ, что и backend, и обращается к API по внутреннему имени сервиса `filmograph-service`.

- Повторный apply не перезапускает загрузку (Job уже в статусе Complete).
- Чтобы загрузить фильмы заново: `kubectl delete job seed-films`, затем снова `kubectl apply -k kubernetes/`.
