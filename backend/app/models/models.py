import uuid
from datetime import datetime
from sqlalchemy import Boolean, DateTime, Float, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column
from app.core.db import Base

class Artwork(Base):
    __tablename__ = "artworks"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    slug: Mapped[str] = mapped_column(String(180), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(250))
    year: Mapped[int] = mapped_column(Integer, index=True)
    width_cm: Mapped[float] = mapped_column(Float)
    height_cm: Mapped[float] = mapped_column(Float)
    depth_cm: Mapped[float | None] = mapped_column(Float, nullable=True)
    technique: Mapped[str] = mapped_column(String(120), index=True)
    material: Mapped[str] = mapped_column(String(120), index=True)
    series: Mapped[str] = mapped_column(String(180), index=True)
    description: Mapped[str] = mapped_column(Text, default="")
    short_description: Mapped[str] = mapped_column(Text, default="")
    status: Mapped[str] = mapped_column(String(50), default="available", index=True)
    image_url: Mapped[str] = mapped_column(String(500))
    detail_images_json: Mapped[str] = mapped_column(Text, default="[]")
    featured: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class Inquiry(Base):
    __tablename__ = "inquiries"
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name: Mapped[str] = mapped_column(String(180))
    contact: Mapped[str] = mapped_column(String(250))
    message: Mapped[str] = mapped_column(Text, default="")
    artwork_slug: Mapped[str | None] = mapped_column(String(180), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
