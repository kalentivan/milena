from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.models import Artwork

SEED = [
    dict(slug='quiet-morning', title='Тихое утро', year=2026, width_cm=90, height_cm=120, depth_cm=2, technique='Масло', material='Холст', series='Тишина', short_description='Работа о состоянии света до начала дня.', description='Тихая работа о моменте, когда пространство ещё не наполнено событиями, а свет становится самостоятельным участником композиции.', status='available', image_url='/media/quiet-morning.svg', detail_images_json='[]', featured=True),
    dict(slug='between-seasons', title='Между сезонами', year=2026, width_cm=110, height_cm=90, depth_cm=2, technique='Смешанная техника', material='Холст', series='Переходы', short_description='Переходное состояние цвета и воздуха.', description='Работа исследует момент перехода: когда один сезон уже закончился, а следующий ещё не приобрёл ясных очертаний.', status='available', image_url='/media/between-seasons.svg', detail_images_json='[]', featured=True),
    dict(slug='blue-silence', title='Синяя тишина', year=2025, width_cm=80, height_cm=100, depth_cm=2, technique='Акрил', material='Холст', series='Тишина', short_description='Холодный свет и ритм глубины.', description='Серия строится вокруг ощущения тишины не как пустоты, а как насыщенного внутреннего пространства.', status='private_collection', image_url='/media/blue-silence.svg', detail_images_json='[]', featured=True),
    dict(slug='garden-after-rain', title='Сад после дождя', year=2025, width_cm=100, height_cm=100, depth_cm=2, technique='Масло', material='Холст', series='Сад', short_description='Влажный цвет, листва и отражённый свет.', description='Работа собирает впечатление сада после дождя: плотность зелени, прозрачность воздуха и дробные отражения света.', status='available', image_url='/media/garden-after-rain.svg', detail_images_json='[]', featured=True),
    dict(slug='light-study', title='Этюд света', year=2024, width_cm=70, height_cm=90, depth_cm=2, technique='Масло', material='Холст', series='Свет', short_description='Наблюдение за тем, как свет меняет форму.', description='Этюд посвящён не предмету, а свету, который делает предмет видимым и одновременно меняет его.', status='sold', image_url='/media/light-study.svg', detail_images_json='[]', featured=True),
    dict(slug='soft-distance', title='Мягкая дистанция', year=2026, width_cm=120, height_cm=80, depth_cm=2, technique='Акрил', material='Холст', series='Переходы', short_description='Работа о расстоянии между формой и воспоминанием.', description='Композиция построена как движение между ясностью и памятью, где контуры намеренно теряют определённость.', status='available', image_url='/media/soft-distance.svg', detail_images_json='[]', featured=True),
]

def seed(db: Session):
    if db.scalar(select(Artwork.id).limit(1)):
        return
    db.add_all([Artwork(**row) for row in SEED]); db.commit()
