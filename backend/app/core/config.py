from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parents[2]

class Settings(BaseSettings):
    database_url: str = f"sqlite:///{BASE_DIR / 'data' / 'gallery.db'}"
    media_dir: Path = BASE_DIR / "media"
    presets_dir: Path = BASE_DIR / "presets"
    cors_origins: str = "http://localhost:3000"
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
