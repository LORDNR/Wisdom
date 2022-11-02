import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import config from "../config";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  config.environments.supabase_url,
  config.environments.supabase_key
);

export const upload = async (file: Express.Multer.File): Promise<string> => {
  const { data, error } = await supabase.storage
    .from("file")
    .upload(uuidv4(), file.buffer, {
      contentType: file.mimetype,
    });
  return (
    `${config.environments.supabase_url}/storage/v1/object/public/file/` +
    data?.path
  );
};
