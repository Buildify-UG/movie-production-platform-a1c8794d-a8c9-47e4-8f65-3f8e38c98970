import React, { useState, useRef } from 'react';
import { Upload as UploadIcon, Music, FileText, Image, Video, X, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://etssvlaeqvcqyqvibnyq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0c3N2bGFlcXZjcXlxdmlibnlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxMjYyODgsImV4cCI6MjEwMzcwMjI4OH0.M0JOga-inw27d2-lKcyKK1lkYo-ulrpIb8mfKmQkFEI'
);

interface UploadedFile {
  id: string;
  name: string;
  type: 'video' | 'music' | 'image' | 'document';
  size: number;
  url: string;
  uploadedAt: string;
  status: 'uploading' | 'completed' | 'failed';
  progress: number;
}

export default function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [selectedType, setSelectedType] = useState<'video' | 'music' | 'image' | 'document'>('video');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileTypeConfig = {
    video: {
      accept: 'video/*',
      bucket: 'videos',
      maxSize: 5 * 1024 * 1024 * 1024, // 5GB
      icon: Video,
      color: 'from-blue-600 to-cyan-600',
      label: 'Upload Video'
    },
    music: {
      accept: 'audio/*',
      bucket: 'music',
      maxSize: 500 * 1024 * 1024, // 500MB
      icon: Music,
      color: 'from-purple-600 to-pink-600',
      label: 'Upload Music'
    },
    image: {
      accept: 'image/*',
      bucket: 'images',
      maxSize: 100 * 1024 * 1024, // 100MB
      icon: Image,
      color: 'from-green-600 to-emerald-600',
      label: 'Upload Image'
    },
    document: {
      accept: '.pdf,.doc,.docx,.txt,.xlsx',
      bucket: 'documents',
      maxSize: 100 * 1024 * 1024, // 100MB
      icon: FileText,
      color: 'from-orange-600 to-red-600',
      label: 'Upload Document'
    }
  };

  const getFileType = (file: File): 'video' | 'music' | 'image' | 'document' | null => {
    if (file.type.startsWith('video/')) return 'video';
    if (file.type.startsWith('audio/')) return 'music';
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.includes('pdf') || file.type.includes('document') || file.type.includes('sheet')) return 'document';
    return null;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const uploadFile = async (file: File) => {
    const fileType = getFileType(file);
    if (!fileType) {
      alert('Unsupported file type');
      return;
    }

    const config = fileTypeConfig[fileType];
    if (file.size > config.maxSize) {
      alert(`File too large. Maximum size: ${formatFileSize(config.maxSize)}`);
      return;
    }

    const fileId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const filePath = `${fileId}_${file.name}`;

    const newFile: UploadedFile = {
      id: fileId,
      name: file.name,
      type: fileType,
      size: file.size,
      url: '',
      uploadedAt: new Date().toLocaleString(),
      status: 'uploading',
      progress: 0
    };

    setUploadedFiles(prev => [...prev, newFile]);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadedFiles(prev =>
          prev.map(f =>
            f.id === fileId && f.progress < 90
              ? { ...f, progress: f.progress + Math.random() * 30 }
              : f
          )
        );
      }, 500);

      const { data, error } = await supabase.storage
        .from(config.bucket)
        .upload(filePath, file);

      clearInterval(progressInterval);

      if (error) throw error;

      // Get public URL
      const { data: publicUrl } = supabase.storage
        .from(config.bucket)
        .getPublicUrl(filePath);

      setUploadedFiles(prev =>
        prev.map(f =>
          f.id === fileId
            ? {
                ...f,
                status: 'completed',
                progress: 100,
                url: publicUrl.publicUrl
              }
            : f
        )
      );
    } catch (error) {
      console.error('Upload error:', error);
      setUploadedFiles(prev =>
        prev.map(f =>
          f.id === fileId ? { ...f, status: 'failed', progress: 0 } : f
        )
      );
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      for (let i = 0; i < files.length; i++) {
        uploadFile(files[i]);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files[0]) {
      for (let i = 0; i < files.length; i++) {
        uploadFile(files[i]);
      }
    }
  };

  const deleteFile = async (file: UploadedFile) => {
    try {
      const config = fileTypeConfig[file.type];
      const filePath = file.url.split('/').pop();
      if (filePath) {
        await supabase.storage.from(config.bucket).remove([filePath]);
      }
      setUploadedFiles(prev => prev.filter(f => f.id !== file.id));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const completedFiles = uploadedFiles.filter(f => f.status === 'completed');
  const uploadingFiles = uploadedFiles.filter(f => f.status === 'uploading');
  const failedFiles = uploadedFiles.filter(f => f.status === 'failed');

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold">Upload Media</h1>
          <p className="text-sm text-muted-foreground mt-1">Share your videos, music, images, and documents</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* File Type Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {(Object.entries(fileTypeConfig) as [keyof typeof fileTypeConfig, typeof fileTypeConfig.video][]).map(([type, config]) => {
            const Icon = config.icon;
            return (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`p-4 rounded-xl border-2 transition ${
                  selectedType === type
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Icon className="w-6 h-6 mb-2" />
                <p className="font-semibold text-sm capitalize">{type}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Max {formatFileSize(config.maxSize)}
                </p>
              </button>
            );
          })}
        </div>

        {/* Upload Area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-12 text-center transition mb-12 cursor-pointer ${
            dragActive
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50 hover:bg-secondary/30'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={fileTypeConfig[selectedType].accept}
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="flex flex-col items-center">
            <Upload className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-bold mb-2">Drop your files here</h3>
            <p className="text-muted-foreground mb-4">or</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition"
            >
              Browse Files
            </button>
            <p className="text-xs text-muted-foreground mt-4">
              {fileTypeConfig[selectedType].label} • Max size: {formatFileSize(fileTypeConfig[selectedType].maxSize)}
            </p>
          </div>
        </div>

        {/* Uploading Files */}
        {uploadingFiles.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">Uploading ({uploadingFiles.length})</h2>
            <div className="space-y-4">
              {uploadingFiles.map(file => (
                <div key={file.id} className="border border-border rounded-xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center flex-shrink-0">
                      <Loader className="w-6 h-6 animate-spin text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{file.name}</p>
                      <div className="w-full bg-secondary/50 rounded-full h-2 mt-2">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full transition-all"
                          style={{ width: `${file.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{Math.round(file.progress)}% • {formatFileSize(file.size)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Completed Files */}
        {completedFiles.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" /> Completed ({completedFiles.length})
            </h2>
            <div className="space-y-4">
              {completedFiles.map(file => {
                const config = fileTypeConfig[file.type];
                const Icon = config.icon;
                return (
                  <div key={file.id} className="border border-border rounded-xl p-4 hover:border-primary/50 transition">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${config.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatFileSize(file.size)} • {file.uploadedAt}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 text-sm border border-border rounded-lg hover:bg-secondary/50 transition"
                        >
                          View
                        </a>
                        <button
                          onClick={() => deleteFile(file)}
                          className="p-2 hover:bg-destructive/10 rounded-lg transition text-destructive"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Failed Files */}
        {failedFiles.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" /> Failed ({failedFiles.length})
            </h2>
            <div className="space-y-4">
              {failedFiles.map(file => (
                <div key={file.id} className="border border-destructive/50 rounded-xl p-4 bg-destructive/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-destructive/20 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-6 h-6 text-destructive" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{file.name}</p>
                      <p className="text-xs text-destructive mt-1">Upload failed</p>
                    </div>
                    <button
                      onClick={() => setUploadedFiles(prev => prev.filter(f => f.id !== file.id))}
                      className="p-2 hover:bg-destructive/10 rounded-lg transition text-destructive"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {uploadedFiles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No files uploaded yet</p>
          </div>
        )}
      </main>
    </div>
  );
}
