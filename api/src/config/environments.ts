const environments = {
  port: Number(process.env.port) || 3000,
  nodeEnv: process.env.NODE_ENV,
  supabase_key: String(process.env.supabase_key),
  supabase_url: String(process.env.supabase_url),
};

export default environments;
