"""Загрузка примеров фильмов в API (работает на Windows и Linux)."""
import base64
import os
from pathlib import Path

import requests

FILMS = [
    ("Матрица", "Хакер Нео узнает, что мир — это симуляция, и вступает в борьбу против машин.", "1.png", "боевик", 136),
    ("Безумный Макс", "В постапокалиптическом мире Макс объединяется с Фуриосой, чтобы сбежать от тирана.", "2.png", "боевик", 88),
    ("Джентельмены", "Британский наркобарон пытается продать свою империю, запуская цепь интриг и разборок.", "3.png", "триллер", 113),
    ("Отступники", "Полицейский под прикрытием и «крот» в мафии пытаются разоблачить друг друга.", "4.png", "триллер", 151),
    ("Гладиатор", "Преданный римский генерал возвращается как гладиатор, чтобы отомстить за свою семью.", "5.png", "боевик", 155),
    ("Однажды в Голливуде", "История актера и его дублера на фоне заката «золотого века» Голливуда 1969 года.", "6.png", "драма", 161),
    ("Предложение", "Влиятельная начальница заставляет своего помощника жениться на ней, чтобы избежать депортации.", "7.png", "комедия", 108),
    ("Малышка на миллион", "Упрямая официантка стремится стать профессиональным боксером под руководством опытного тренера.", "8.png", "драма", 132),
    ("Ларри Краун", "Потеряв работу, мужчина средних лет отправляется в колледж за новым стартом в жизни.", "9.png", "комедия", 98),
]

# В Kubernetes задайте API_BASE_URL (например http://filmograph-service) без слэша в конце
BASE_URL = (os.environ.get("API_BASE_URL") or "http://127.0.0.1:8000").rstrip("/") + "/films/"
IMAGES_PATH = Path(__file__).parent / "images"


def main():
    for name, description, image_filename, film_type, duration in FILMS:
        print(f"Добавляем фильм: {name}")
        full_image_path = IMAGES_PATH / image_filename
        if not full_image_path.is_file():
            print(f"Ошибка: файл {full_image_path} не найден")
            print("---")
            continue
        image_base64 = base64.b64encode(full_image_path.read_bytes()).decode()
        data = {
            "name": name,
            "description": description,
            "image": f"data:image/png;base64,{image_base64}",
            "film_type": film_type,
            "duration": duration,
        }
        try:
            r = requests.post(BASE_URL, json=data, timeout=10)
            r.raise_for_status()
            print(f"  OK (id={r.json().get('id', '?')})")
        except requests.RequestException as e:
            print(f"  Ошибка: {e}")
        print("---")
    print("Готово. Проверьте http://localhost:8000/films/")


if __name__ == "__main__":
    main()
