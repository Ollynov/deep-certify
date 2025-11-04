"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  LinkIcon,
  ImageIcon,
  Music,
  Video,
  Loader2,
} from "lucide-react";

export function MediaUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mediaUrl, setMediaUrl] = useState("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      // TODO: Implement Reality Defender API integration
      // 1. Request presigned URL
      // 2. Upload file to presigned URL
      // 3. Request analysis results
      console.log("[v0] Uploading file:", selectedFile.name);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate upload
      alert("File uploaded successfully! Analysis will begin shortly.");
      setSelectedFile(null);
    } catch (error) {
      console.error("[v0] Upload error:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = async () => {
    if (!mediaUrl) return;

    setIsUploading(true);
    try {
      // TODO: Implement URL-based submission
      console.log("[v0] Submitting URL:", mediaUrl);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate submission
      alert("URL submitted successfully! Analysis will begin shortly.");
      setMediaUrl("");
    } catch (error) {
      console.error("[v0] URL submission error:", error);
      alert("Submission failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mb-8 rounded-lg border border-primary/20 bg-card/50 p-6">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <Upload className="h-5 w-5 text-primary" />
        Upload Media for Certification
      </h3>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="upload">Upload File</TabsTrigger>
          <TabsTrigger value="url">Submit URL</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <div className="rounded-lg border-2 border-dashed border-primary/30 bg-background/50 p-8 text-center hover:border-primary/50 transition-colors">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept="image/*,audio/*,video/*"
              onChange={handleFileSelect}
              disabled={isUploading}
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="flex justify-center gap-4 mb-4">
                <ImageIcon className="h-8 w-8 text-primary/60" />
                <Music className="h-8 w-8 text-primary/60" />
                <Video className="h-8 w-8 text-primary/60" />
              </div>
              <p className="font-medium mb-2">
                {selectedFile
                  ? selectedFile.name
                  : "Click to select or drag and drop"}
              </p>
              <p className="text-sm text-muted-foreground">
                Supports images (JPG, PNG, GIF) and audio (MP3, WAV, M4A)
              </p>
              <p className="text-sm text-muted-foreground">
                Video coming soon! (MP4, MOV)
              </p>
            </label>
          </div>

          {selectedFile && (
            <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                  {selectedFile.type.startsWith("image/") && (
                    <ImageIcon className="h-5 w-5 text-primary" />
                  )}
                  {selectedFile.type.startsWith("audio/") && (
                    <Music className="h-5 w-5 text-primary" />
                  )}
                  {selectedFile.type.startsWith("video/") && (
                    <Video className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                onClick={handleFileUpload}
                disabled={isUploading}
                className="bg-primary hover:bg-primary/90"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Certify
                  </>
                )}
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="url" className="space-y-4">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="media-url"
                className="text-sm font-medium mb-2 block"
              >
                Media URL
              </label>
              <Input
                id="media-url"
                type="url"
                placeholder="https://example.com/media.mp4"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                disabled={isUploading}
                className="bg-background"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Enter a direct link to an image, audio file, or video
              </p>
            </div>

            <Button
              onClick={handleUrlSubmit}
              disabled={!mediaUrl || isUploading}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Certify from URL
                </>
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-primary/10">
        <p className="text-xs text-muted-foreground">
          <strong>Supported formats:</strong> Images (JPG, PNG, GIF up to 10MB),
          Audio (MP3, WAV, M4A up to 50MB), Video (MP4, MOV up to 250MB)
        </p>
      </div>
    </div>
  );
}
