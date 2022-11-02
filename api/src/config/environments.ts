const environments = {
  PORT: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV,
  supabase_key: String(process.env.supabase_key),
  supabase_url: String(process.env.supabase_url),
};

export default environments;
