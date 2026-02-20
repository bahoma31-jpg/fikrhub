-- Migration: Add pgvector extension and IVFFlat index
CREATE EXTENSION IF NOT EXISTS vector;

-- إضافة فهرس IVFFlat لتحسين سرعة البحث المتجهي التشابهي (Cosine Similarity)
-- ملاحظة: تم ضبط lists = 100 كقيمة افتراضية، يمكن زيادتها مع زيادة البيانات.
CREATE INDEX IF NOT EXISTS idea_embedding_idx ON ideas 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
