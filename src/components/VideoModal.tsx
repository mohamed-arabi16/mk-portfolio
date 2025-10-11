import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ExternalLink } from "lucide-react";
import ReactPlayer from "react-player";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
  description?: string;
}

export function VideoModal({ isOpen, onClose, videoUrl, title, description }: VideoModalProps) {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const handleOpenOriginal = () => {
    window.open(videoUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold pr-8">{title}</DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenOriginal}
                className="btn-liquid"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Original
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {description && (
            <p className="text-muted-foreground mt-2">{description}</p>
          )}
        </DialogHeader>
        
        <div className="px-6 pb-6">
          <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
            {!isPlayerReady && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
              </div>
            )}
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <p className="text-muted-foreground">
                Loading video player... 
                <br />
                <button 
                  onClick={handleOpenOriginal}
                  className="text-accent underline mt-2 inline-block"
                >
                  Open video directly
                </button>
              </p>
            </div>
          </div>
          
          <div className="mt-4 flex justify-center">
            <Button
              variant="outline"
              onClick={handleOpenOriginal}
              className="btn-liquid"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View on Platform
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}