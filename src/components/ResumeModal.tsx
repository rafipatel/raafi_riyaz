import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Download, ExternalLink, FileText, X } from "lucide-react";
import { socialLinks } from "@/data/portfolioData";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const btn = "inline-flex min-h-[40px] items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors";

/** CV viewer, styled as a tool result the agent just opened. */
const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  const previewLink = socialLinks.cv.replace("/view?usp=sharing", "/preview");
  // Google Drive's direct-download endpoint: the browser saves the PDF straight away.
  const fileId = socialLinks.cv.match(/\/d\/([^/]+)/)?.[1];
  const downloadLink = fileId ? `https://drive.google.com/uc?export=download&id=${fileId}` : socialLinks.cv;

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 flex h-[min(92svh,960px)] w-[min(96vw,980px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-ro-line2 bg-ro-surface text-ro-fg shadow-2xl duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-ro-line px-5 py-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ro-tool-bg text-ro-tool-fg">
                <FileText className="h-5 w-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-xs text-ro-muted">open("raafi_riyaz_cv.pdf")</p>
                <DialogPrimitive.Title className="truncate text-lg font-bold tracking-[-0.01em]">Raafi Riyaz · CV</DialogPrimitive.Title>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a href={socialLinks.cv} target="_blank" rel="noopener noreferrer" className={`${btn} border border-ro-line2 hover:border-ro-acc`}>
                <ExternalLink className="h-4 w-4" aria-hidden />
                <span className="hidden sm:inline">Open in new tab</span>
              </a>
              <a href={downloadLink} download="raafi_riyaz_cv.pdf" className={`${btn} bg-ro-acc text-ro-acc-ink hover:opacity-90`}>
                <Download className="h-4 w-4" aria-hidden />
                Download
              </a>
              <DialogPrimitive.Close
                aria-label="Close CV"
                className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-ro-line2 text-ro-muted hover:border-ro-acc hover:text-ro-fg"
              >
                <X className="h-4 w-4" aria-hidden />
              </DialogPrimitive.Close>
            </div>
          </div>
          <DialogPrimitive.Description className="sr-only">A preview of Raafi Riyaz's CV with a download link.</DialogPrimitive.Description>

          <div className="min-h-0 flex-1 bg-ro-inset p-3 sm:p-4">
            <iframe src={previewLink} title="Raafi Riyaz CV" allow="autoplay" className="h-full w-full rounded-xl border border-ro-line bg-white" />
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default ResumeModal;
