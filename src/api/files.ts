import { apiFetch } from "@/lib/fetch";

export interface FileEntry {
  file_id: string;
  file_name: string;
}

interface FileResponse {
  files: FileEntry[];
}

export async function all() {
  return (await apiFetch<FileResponse>("/files/files")).files;
}
