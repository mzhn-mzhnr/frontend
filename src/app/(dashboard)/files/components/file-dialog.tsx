import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PropsWithChildren } from "react";
import FileDropzone from "./file-dropzone";

export interface FileDialogProps extends PropsWithChildren {}

export default function FileDialog({ children }: FileDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Загрузка документов</DialogTitle>
        </DialogHeader>
        <FileDropzone />
      </DialogContent>
    </Dialog>
  );
}
