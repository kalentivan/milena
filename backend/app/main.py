from pathlib import Path
import json
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.db import Base, SessionLocal, engine, get_db
from app.models.models import Artwork, Inquiry
from app.schemas.schemas import ArtworkOut, InquiryCreate
from app.services.seed import seed

app = FastAPI(title='Milena Gallery API', version='0.1.0')
app.add_middleware(CORSMiddleware, allow_origins=[x.strip() for x in settings.cors_origins.split(',')], allow_credentials=True, allow_methods=['*'], allow_headers=['*'])
settings.media_dir.mkdir(parents=True, exist_ok=True)
app.mount('/media', StaticFiles(directory=settings.media_dir), name='media')

@app.on_event('startup')
def startup():
    Base.metadata.create_all(engine)
    with SessionLocal() as db: seed(db)

@app.get('/health')
def health(): return {'status':'ok'}


@app.get('/api/presets/{kind}/{preset_id}')
def get_preset(kind: str, preset_id: str):
    folder = {'themes': 'themes', 'galleries': 'galleries'}.get(kind)
    if not folder or '/' in preset_id or '..' in preset_id:
        raise HTTPException(404, 'Preset not found')
    path = settings.presets_dir / folder / f'{preset_id}.json'
    if not path.exists():
        raise HTTPException(404, 'Preset not found')
    return json.loads(path.read_text(encoding='utf-8'))

@app.get('/api/presets/{kind}')
def list_presets(kind: str):
    folder = {'themes': 'themes', 'galleries': 'galleries'}.get(kind)
    if not folder:
        raise HTTPException(404, 'Preset kind not found')
    base = settings.presets_dir / folder
    return [json.loads(p.read_text(encoding='utf-8')) for p in sorted(base.glob('*.json'))]

@app.get('/api/artworks', response_model=list[ArtworkOut])
def artworks(db: Session = Depends(get_db)):
    rows=db.scalars(select(Artwork).order_by(Artwork.year.desc(), Artwork.title)).all()
    return [ArtworkOut.from_orm_artwork(x) for x in rows]

@app.get('/api/artworks/{slug}', response_model=ArtworkOut)
def artwork(slug: str, db: Session = Depends(get_db)):
    row=db.scalar(select(Artwork).where(Artwork.slug==slug))
    if not row: raise HTTPException(404,'Artwork not found')
    return ArtworkOut.from_orm_artwork(row)

@app.post('/api/inquiries', status_code=201)
def create_inquiry(body: InquiryCreate, db: Session = Depends(get_db)):
    row=Inquiry(**body.model_dump()); db.add(row); db.commit(); return {'id':row.id,'status':'created'}

@app.get('/api/inquiries')
def list_inquiries(db: Session = Depends(get_db)):
    return db.scalars(select(Inquiry).order_by(Inquiry.created_at.desc())).all()
