-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Employees table
CREATE TABLE IF NOT EXISTS public.ai_employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  provider TEXT NOT NULL CHECK (provider IN ('claude', 'chatgpt', 'gemini')),
  description TEXT,
  capabilities JSONB DEFAULT '[]'::jsonb,
  price DECIMAL(10, 2) DEFAULT 1.00,
  image TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hired Employees (many-to-many relationship)
CREATE TABLE IF NOT EXISTS public.hired_employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  employee_id UUID REFERENCES public.ai_employees(id) ON DELETE CASCADE,
  hired_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused')),
  UNIQUE(user_id, employee_id)
);

-- Chat Sessions
CREATE TABLE IF NOT EXISTS public.chat_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  employee_id UUID REFERENCES public.ai_employees(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat Messages
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hired_employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- AI Employees policies (public read)
CREATE POLICY "Anyone can view AI employees" ON public.ai_employees
  FOR SELECT USING (true);

-- Hired Employees policies
CREATE POLICY "Users can view their hired employees" ON public.hired_employees
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can hire employees" ON public.hired_employees
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their hired employees" ON public.hired_employees
  FOR UPDATE USING (auth.uid() = user_id);

-- Chat Sessions policies
CREATE POLICY "Users can view their chat sessions" ON public.chat_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create chat sessions" ON public.chat_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Chat Messages policies
CREATE POLICY "Users can view their chat messages" ON public.chat_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.chat_sessions
      WHERE chat_sessions.id = chat_messages.session_id
      AND chat_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create chat messages" ON public.chat_messages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.chat_sessions
      WHERE chat_sessions.id = chat_messages.session_id
      AND chat_sessions.user_id = auth.uid()
    )
  );

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample AI employees
INSERT INTO public.ai_employees (name, role, provider, description, capabilities, price) VALUES
('Claude Engineer', 'Software Engineer', 'claude', 'Expert in full-stack development, code review, and system architecture', '["React", "Node.js", "TypeScript", "System Design"]'::jsonb, 1.00),
('GPT Data Scientist', 'Data Scientist', 'chatgpt', 'Specialized in data analysis, ML models, and insights generation', '["Python", "ML", "Data Analysis", "Statistics"]'::jsonb, 1.00),
('Gemini Marketing Pro', 'Marketing Manager', 'gemini', 'Creative campaigns, SEO optimization, and content strategy', '["SEO", "Content Marketing", "Social Media", "Analytics"]'::jsonb, 1.00),
('Claude Support Agent', 'Customer Support', 'claude', '24/7 customer service with empathy and problem-solving skills', '["Support", "Communication", "Problem Solving", "CRM"]'::jsonb, 1.00),
('GPT DevOps Engineer', 'DevOps Engineer', 'chatgpt', 'Infrastructure management, CI/CD, and cloud deployment', '["AWS", "Docker", "Kubernetes", "CI/CD"]'::jsonb, 1.00),
('Gemini Content Writer', 'Content Writer', 'gemini', 'Blog posts, documentation, and creative writing', '["Writing", "Editing", "SEO", "Research"]'::jsonb, 1.00),
('Claude Security Expert', 'Security Engineer', 'claude', 'Security audits, penetration testing, and vulnerability assessment', '["Security", "Pentesting", "Compliance", "Risk Assessment"]'::jsonb, 1.00);
