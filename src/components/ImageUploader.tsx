"use client";

import { useState, useRef, useEffect } from "react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  recommendedRatio?: "16:9" | "4:5" | "1:1";
}

export default function ImageUploader({ value, onChange, recommendedRatio = "16:9" }: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  // Cropper states
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Viewport sizes
  const viewportWidth = 360;
  const viewportHeight = recommendedRatio === "16:9" ? 202.5 : recommendedRatio === "1:1" ? 360 : 450; // 16:9 or 1:1 or 4:5 (scaled down for UI)

  // Reset cropper states
  const resetCropper = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setIsDragging(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    resetCropper();

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
      setShowCropModal(true);
    };
    reader.onerror = () => {
      setError("Gagal membaca file gambar.");
    };
    reader.readAsDataURL(file);
  };

  // Calculate image sizes inside viewport
  useEffect(() => {
    if (!previewUrl || !showCropModal) return;

    const img = new Image();
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });
    };
    img.src = previewUrl;
  }, [previewUrl, showCropModal]);

  // Math to fit image to cover viewport
  const getFitDimensions = () => {
    if (imageSize.width === 0 || imageSize.height === 0) return { width: 0, height: 0 };

    const vpRatio = viewportWidth / viewportHeight;
    const imgRatio = imageSize.width / imageSize.height;

    let width = 0;
    let height = 0;

    if (vpRatio > imgRatio) {
      width = viewportWidth;
      height = viewportWidth / imgRatio;
    } else {
      height = viewportHeight;
      width = viewportHeight * imgRatio;
    }

    return {
      width: width * zoom,
      height: height * zoom,
    };
  };

  const fit = getFitDimensions();
  const left = (viewportWidth - fit.width) / 2 + pan.x;
  const top = (viewportHeight - fit.height) / 2 + pan.y;

  // Dragging event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    setPan({
      x: newX,
      y: newY,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const newX = touch.clientX - dragStart.x;
    const newY = touch.clientY - dragStart.y;

    setPan({
      x: newX,
      y: newY,
    });
  };

  const handleCropAndUpload = () => {
    if (!imageRef.current) return;
    setIsUploading(true);
    setError("");

    const canvas = document.createElement("canvas");
    // Output resolution: 800x450 for 16:9, 500x500 for 1:1, or 400x500 for 4:5
    const outputWidth = recommendedRatio === "16:9" ? 800 : recommendedRatio === "1:1" ? 500 : 400;
    const outputHeight = recommendedRatio === "16:9" ? 450 : recommendedRatio === "1:1" ? 500 : 500;
    
    canvas.width = outputWidth;
    canvas.height = outputHeight;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      setError("Gagal membuat canvas rendering context.");
      setIsUploading(false);
      return;
    }

    const scale = outputWidth / viewportWidth;

    const destX = left * scale;
    const destY = top * scale;
    const destW = fit.width * scale;
    const destH = fit.height * scale;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = async () => {
      // Draw zoomed/panned image onto canvas
      ctx.drawImage(img, destX, destY, destW, destH);

      canvas.toBlob(async (blob) => {
        if (!blob) {
          setError("Gagal membuat data gambar terpotong.");
          setIsUploading(false);
          return;
        }

        const formData = new FormData();
        formData.append("file", blob, "cropped_image.jpg");

        try {
          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();

          if (res.ok && data.ok) {
            onChange(data.url);
            setShowCropModal(false);
            setPreviewUrl(null);
          } else {
            setError(data.error || "Gagal mengunggah gambar terpotong.");
          }
        } catch (err) {
          setError("Kesalahan koneksi ke server.");
        } finally {
          setIsUploading(false);
        }
      }, "image/jpeg", 0.9);
    };
    img.src = previewUrl!;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        {/* Render current image */}
        <div className="w-full sm:w-48 h-32 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center relative">
          {value ? (
            <img src={value} alt="Foto saat ini" className="w-full h-full object-cover" />
          ) : (
            <div className="text-gray-400 text-center text-xs p-2">
              <i className="fas fa-image text-2xl mb-1 block"></i>
              Belum ada foto
            </div>
          )}
        </div>

        <div className="flex-1 w-full space-y-2">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="admin-btn-action secondary text-xs"
              style={{ padding: "8px 12px" }}
            >
              <i className="fas fa-folder-open"></i> Pilih File Foto
            </button>

            {value && (
              <button
                type="button"
                onClick={() => {
                  setError("");
                  resetCropper();
                  setPreviewUrl(value);
                  setShowCropModal(true);
                }}
                className="admin-btn-action secondary text-xs border border-emerald-500 text-emerald-700 hover:bg-emerald-50"
                style={{ padding: "8px 12px" }}
              >
                <i className="fas fa-crop-alt"></i> Edit Posisi/Ukuran
              </button>
            )}
          </div>

          {value && (
            <p className="text-xs text-gray-500 break-all">
              <strong>URL:</strong> {value}
            </p>
          )}

          {error && <p className="text-xs text-red-600 font-semibold">{error}</p>}
        </div>
      </div>

      {/* Interactive Cropper Modal */}
      {showCropModal && previewUrl && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[2000] p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-w-md w-full overflow-hidden animate-fade-in-up">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-800 text-lg">Sesuaikan Posisi & Ukuran</h3>
              <button
                type="button"
                onClick={() => {
                  setShowCropModal(false);
                  setPreviewUrl(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="p-6 space-y-6 flex flex-col items-center">
              <p className="text-xs text-gray-500 text-center">
                Geser (drag) foto dan gunakan slider untuk memperbesar/memperkecil agar pas dengan area yang ditentukan.
              </p>

              {/* Viewport container */}
              <div
                ref={viewportRef}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
                className="border border-gray-300 rounded-lg overflow-hidden bg-gray-100 relative cursor-move select-none"
                style={{
                  width: `${viewportWidth}px`,
                  height: `${viewportHeight}px`,
                }}
              >
                <img
                  ref={imageRef}
                  src={previewUrl}
                  alt="Crop Target"
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                  style={{
                    position: "absolute",
                    width: `${fit.width}px`,
                    height: `${fit.height}px`,
                    left: `${left}px`,
                    top: `${top}px`,
                    maxWidth: "none",
                    maxHeight: "none",
                    pointerEvents: "auto",
                  }}
                  draggable={false}
                />
                
                {/* Visual guidelines mask overlay */}
                <div className="absolute inset-0 pointer-events-none border border-emerald-500/50" />
              </div>

              {/* Zoom range slider control */}
              <div className="w-full space-y-1">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Zoom / Skala Foto</span>
                  <span className="font-bold">{Math.round(zoom * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowCropModal(false);
                  setPreviewUrl(null);
                }}
                className="admin-btn-action secondary"
                disabled={isUploading}
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleCropAndUpload}
                className="admin-btn-action primary"
                disabled={isUploading}
                style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                {isUploading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Mengunggah...
                  </>
                ) : (
                  <>
                    <i className="fas fa-crop-alt"></i> Potong & Unggah
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
