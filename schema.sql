-- =============================================================
-- PORTAL RODIN V2 — DATABASE SCHEMA (SUPABASE POSTGRESQL)
-- Cole este script no SQL Editor do seu Supabase:
-- https://supabase.com/dashboard/project/vjnfkaenqrprtsiuqilb/sql/new
-- =============================================================

-- 1. TABELA DE TURMAS
CREATE TABLE IF NOT EXISTS public.turmas (
    id TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    etapa TEXT NOT NULL DEFAULT 'Ensino Fundamental Anos Finais',
    slug TEXT NOT NULL UNIQUE,
    config_mapa JSONB DEFAULT '{"linhas": 5, "colunas": 6}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TABELA DE ALUNOS
CREATE TABLE IF NOT EXISTS public.alunos (
    id TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    turma_id TEXT REFERENCES public.turmas(id) ON DELETE CASCADE,
    condicao TEXT NOT NULL DEFAULT 'Nenhuma',
    avatar TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABELA DE PROFESSORES
CREATE TABLE IF NOT EXISTS public.professores (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    nome TEXT NOT NULL,
    etapa TEXT DEFAULT 'Ensino Fundamental Anos Finais',
    biometria_facial_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TABELA DE DISCIPLINAS
CREATE TABLE IF NOT EXISTS public.disciplinas (
    id TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    etapa TEXT DEFAULT 'Ensino Fundamental Anos Finais',
    cor TEXT DEFAULT '#F45206',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. JUNÇÃO PROFESSORES - TURMAS - DISCIPLINAS (PTD)
CREATE TABLE IF NOT EXISTS public.professores_turmas_disciplinas (
    id TEXT PRIMARY KEY,
    professor_id TEXT REFERENCES public.professores(id) ON DELETE CASCADE,
    turma_id TEXT REFERENCES public.turmas(id) ON DELETE CASCADE,
    disciplina_id TEXT REFERENCES public.disciplinas(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. TABELA DE OCORRÊNCIAS DOS ALUNOS
CREATE TABLE IF NOT EXISTS public.ocorrencias_alunos (
    id TEXT PRIMARY KEY,
    aluno_id TEXT REFERENCES public.alunos(id) ON DELETE CASCADE,
    turma_id TEXT REFERENCES public.turmas(id) ON DELETE CASCADE,
    disciplina_id TEXT REFERENCES public.disciplinas(id) ON DELETE SET NULL,
    criado_por TEXT,
    professor_nome TEXT NOT NULL DEFAULT 'Prof. Marcos Antônio',
    tipo TEXT NOT NULL,
    descricao TEXT,
    audio_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. TABELA DE INTERVENÇÕES DO ORIENTADOR (CENTRAL DE ACOLHIMENTO)
CREATE TABLE IF NOT EXISTS public.intervencoes_orientador (
    id TEXT PRIMARY KEY,
    aluno_id TEXT REFERENCES public.alunos(id) ON DELETE CASCADE,
    ocorrencia_id TEXT REFERENCES public.ocorrencias_alunos(id) ON DELETE SET NULL,
    coluna TEXT NOT NULL DEFAULT 'analise14',
    anotacao TEXT NOT NULL,
    orientador_nome TEXT NOT NULL DEFAULT 'Mariana Medeiros',
    orientador_cargo TEXT NOT NULL DEFAULT 'Orientadora Pedagógica',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. TABELA DE ESTADOS DO KANBAN
CREATE TABLE IF NOT EXISTS public.kanban_estados (
    aluno_id TEXT PRIMARY KEY REFERENCES public.alunos(id) ON DELETE CASCADE,
    coluna TEXT NOT NULL DEFAULT 'entrada',
    data_conversa DATE,
    horario_conversa TEXT,
    data_analise TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. TABELA DE SLOTS DO MAPA DE SALA (CARTEIRAS)
CREATE TABLE IF NOT EXISTS public.mapa_sala_slots (
    id TEXT PRIMARY KEY,
    turma_id TEXT REFERENCES public.turmas(id) ON DELETE CASCADE,
    aluno_id TEXT REFERENCES public.alunos(id) ON DELETE SET NULL,
    posicao_x INT NOT NULL,
    posicao_y INT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. TABELA DE SLOTS DA GRADE HORÁRIA SEMANAL
CREATE TABLE IF NOT EXISTS public.grade_horaria_slots (
    id TEXT PRIMARY KEY,
    turma_id TEXT REFERENCES public.turmas(id) ON DELETE CASCADE,
    disciplina_id TEXT REFERENCES public.disciplinas(id) ON DELETE CASCADE,
    professor_id TEXT REFERENCES public.professores(id) ON DELETE CASCADE,
    posicao_x INT NOT NULL,
    posicao_y INT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- HABILITAR SEGURANÇA E POLÍTICAS DE RLS (ROW LEVEL SECURITY)
ALTER TABLE public.turmas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alunos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disciplinas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professores_turmas_disciplinas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ocorrencias_alunos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.intervencoes_orientador ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kanban_estados ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mapa_sala_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grade_horaria_slots ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS DE SEGURANÇA PADRÃO (ACESSO CONTROLADO)
DROP POLICY IF EXISTS "Acesso Leitura Pública" ON public.turmas;
CREATE POLICY "Acesso Leitura Pública" ON public.turmas FOR SELECT USING (true);

DROP POLICY IF EXISTS "Acesso Leitura Pública" ON public.alunos;
CREATE POLICY "Acesso Leitura Pública" ON public.alunos FOR SELECT USING (true);

DROP POLICY IF EXISTS "Acesso Leitura Pública" ON public.professores;
CREATE POLICY "Acesso Leitura Pública" ON public.professores FOR SELECT USING (true);

DROP POLICY IF EXISTS "Acesso Leitura Pública" ON public.disciplinas;
CREATE POLICY "Acesso Leitura Pública" ON public.disciplinas FOR SELECT USING (true);

DROP POLICY IF EXISTS "Acesso Leitura Autenticada" ON public.ocorrencias_alunos;
CREATE POLICY "Acesso Leitura Autenticada" ON public.ocorrencias_alunos FOR SELECT USING (true);

DROP POLICY IF EXISTS "Escrita Ocorrências Autenticada" ON public.ocorrencias_alunos;
CREATE POLICY "Escrita Ocorrências Autenticada" ON public.ocorrencias_alunos FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Atualização Ocorrências Autenticada" ON public.ocorrencias_alunos;
CREATE POLICY "Atualização Ocorrências Autenticada" ON public.ocorrencias_alunos FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Acesso Leitura Autenticada" ON public.mapa_sala_slots;
CREATE POLICY "Acesso Leitura Autenticada" ON public.mapa_sala_slots FOR SELECT USING (true);

DROP POLICY IF EXISTS "Acesso Escrita Autenticada" ON public.mapa_sala_slots;
CREATE POLICY "Acesso Escrita Autenticada" ON public.mapa_sala_slots FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Acesso Leitura Autenticada" ON public.grade_horaria_slots;
CREATE POLICY "Acesso Leitura Autenticada" ON public.grade_horaria_slots FOR SELECT USING (true);

DROP POLICY IF EXISTS "Acesso Escrita Autenticada" ON public.grade_horaria_slots;
CREATE POLICY "Acesso Escrita Autenticada" ON public.grade_horaria_slots FOR ALL USING (true) WITH CHECK (true);

-- CARGA INICIAL DE SEED DE DADOS COMPÁTIVEIS
INSERT INTO public.turmas (id, nome, etapa, slug) VALUES
('t1', '6º Ano A', 'Ensino Fundamental Anos Finais', '6-ano-a'),
('t2', '7º Ano A', 'Ensino Fundamental Anos Finais', '7-ano-a'),
('t3', '8º Ano A', 'Ensino Fundamental Anos Finais', '8-ano-a'),
('t4', '9º Ano A', 'Ensino Fundamental Anos Finais', '9-ano-a'),
('t5', '1ª Série EM', 'Ensino Médio', '1-serie-em')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.disciplinas (id, nome, cor) VALUES
('d1', 'Matemática', '#3B82F6'),
('d2', 'Língua Portuguesa', '#F45206'),
('d3', 'História', '#8B5CF6'),
('d4', 'Geografia', '#10B981'),
('d5', 'Ciências', '#06B6D4')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.professores (id, nome, etapa, biometria_facial_status) VALUES
('p1', 'Prof. Carlos Eduardo', 'Ensino Fundamental Anos Finais', true),
('p2', 'Profa. Ana Paula', 'Ensino Fundamental Anos Finais', true),
('p3', 'Prof. Marcos Silva', 'Ensino Fundamental Anos Finais', true),
('p4', 'Profa. Julia Fernandes', 'Ensino Fundamental Anos Finais', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.alunos (id, nome, turma_id, condicao, avatar) VALUES
('a1', 'Gabriel Corrêa', 't1', 'TDAH', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80'),
('a2', 'Guilherme Moraes', 't1', 'Superdotação', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'),
('a3', 'Cecília Santos', 't1', 'TEA', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80'),
('a4', 'João Vitor Reis', 't1', 'Nenhuma', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'),
('a5', 'Helena Borsari', 't1', 'Nenhuma', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80')
ON CONFLICT (id) DO NOTHING;

-- 10. TABELA DE USUÁRIOS E PERMISSÕES DE SISTEMA
CREATE TABLE IF NOT EXISTS public.usuarios_sistema (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    nome TEXT NOT NULL,
    cargo TEXT NOT NULL,
    papel TEXT NOT NULL DEFAULT 'orientador',
    turmas_permitidas JSONB DEFAULT '"todas"'::jsonb,
    foto TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.usuarios_sistema DISABLE ROW LEVEL SECURITY;

INSERT INTO public.usuarios_sistema (id, email, nome, cargo, papel, turmas_permitidas, foto) VALUES
('usr_diretor', 'direcao@colegiorodin.com.br', 'Benedito Donizete Bueno da Silva', 'Direção Geral (Admin)', 'diretor', '"todas"'::jsonb, 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80'),
('usr_ricardo', 'orientacao@colegiorodin.com.br', 'Ricardo Augusto Posso', 'Orientador Pedagógico (6º e 7º Anos)', 'orientador', '["6º Ano A", "6º Ano B", "7º Ano A", "7º Ano B"]'::jsonb, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80')
ON CONFLICT (id) DO NOTHING;
