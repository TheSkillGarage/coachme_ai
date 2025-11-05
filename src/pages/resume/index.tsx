"use client"

import type React from "react"
import { FileText, Upload, Download, Trash2, Eye, ArrowLeft } from "lucide-react"
import Button from "../../components/ui/button/button"
import { useState, useRef } from "react"

interface Resume {
  id: string
  name: string
  uploadedAt: string
  size: string
}
export default function Main() {

   const [resumes, setResumes] = useState<Resume[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isUploadingFlow, setIsUploadingFlow] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const SUPPORTED_FORMATS = ["pdf", "doc", "docx", "xlsx", "pptx", "png", "svg"]
  const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

  const isValidFile = (file: File) => {
    const fileExtension = file.name.split(".").pop()?.toLowerCase()
    return fileExtension && SUPPORTED_FORMATS.includes(fileExtension) && file.size <= MAX_FILE_SIZE
  }

  const handleFileInput = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0]
      if (isValidFile(file)) {
        setSelectedFile(file)
      } else {
        alert("Invalid file. Please check format and size (max 5MB).")
        setSelectedFile(null)
      }
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileInput(e.dataTransfer.files)
  }

  const handleUploadResume = () => {
    if (selectedFile) {
      const newResume: Resume = {
        id: Math.random().toString(36).substr(2, 9),
        name: selectedFile.name,
        uploadedAt: new Date().toLocaleDateString(),
        size: (selectedFile.size / 1024 / 1024).toFixed(2) + " MB",
      }
      setResumes([newResume, ...resumes])
      setSelectedFile(null)
      setIsUploadingFlow(false)
    }
  }

  const handleDeleteResume = (id: string) => {
    setResumes(resumes.filter((resume) => resume.id !== id))
  }

  const handleCancel = () => {
    setSelectedFile(null)
    setIsUploadingFlow(false)
  }

  if (isUploadingFlow) {
    return (
      <div className="min-h-full bg-background px-6 py-8">
        <div className="mx-auto">
          {/* Header with back button */}
          <div className="mb-8">
            
            <Button
            variant="ghost"
            onClick={handleCancel}
            color="text-muted-foreground"
            bg="bg-white"
            className="hover:text-foreground rounded-3xl shadow-sm hover:shadow-md transition-transform hover:-translate-y-[1px]"
            icon={<ArrowLeft className="w-4 h-4" />}
            iconPosition="left"
          >
              Back
            </Button>
          </div>

          {/* Upload Section */}
          <div className="bg-Neutral px-4 md:px-10 pt-4 md:pt-10 pb-4 md:pb-12 rounded-xl outline-1 outline-offset-[-1px] outline-[#e8e8e8] ">
            <h2 className="text-[#1b1b1b] text-xl md:text-2xl font-semibold mb-2">Upload Your Resume</h2>
            <p className="text-base mb-8">Upload your resume to get started with your job search</p>

            {/* Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`rounded outline-dashed outline-[0.50px] outline-offset-[-0.50px] outline-[#b8b8b8] p-12 mb-6 transition-colors ${
                isDragging
                  ? "border-purple-700 bg-purple-50 dark:bg-purple-950/20"
                  : "border-muted-foreground/30 bg-muted/30"
              }`}
            >
              <div className="flex flex-col items-center justify-center">

                <div className="p-5 bg-[#bd94b823] rounded-full flex items-center justify-center mb-4">
                  <Upload className="w-12 h-12 text-muted-foreground" />
                 </div> 
                <p className="text-foreground font-medium mb-1">Drag & Drop your file here or</p>
              
                <Button
                  variant="ghost"
                  onClick={() => fileInputRef.current?.click()}
                  color="text-purple-700"
                  className="hover:text-purple-800 p-0"
                >
                  Browse Files to Upload
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Supported file size: PDF, DOCX, XLSX, PPTX, PNG, SVG (Max 5MB)
                </p>
              </div>
            </div>

            {/* Selected File Display */}
            {selectedFile && (
              <div className="bg-muted/50 rounded-lg p-4 mb-6 border border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-purple-700" />
                    <div>
                      <p className="font-medium text-foreground">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedFile(null)
                      if (fileInputRef.current) fileInputRef.current.value = ""
                    }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Change
                  </Button>
                </div>
              </div>
            )}

            {/* Action Buttons */}

            <div className="flex justify-end gap-4 mt-8">
              <Button
                variant="outline"
                onClick={handleCancel}
                rounded="lg"
                className="px-6 py-2 border-border text-foreground hover:bg-muted/40 transition-all"
              >
                Cancel
              </Button>

              <Button
                onClick={handleUploadResume}
                disabled={!selectedFile}
                bg="bg-purple-700"
                color="text-white"
                rounded="lg"
                className="px-6 py-2 hover:bg-purple-800 disabled:opacity-50 transition-all shadow-sm hover:shadow-md"
                icon={<Upload className="w-4 h-4" />}
                iconPosition="left"
              >
                Upload Resume
              </Button>
            </div>

          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.xlsx,.pptx,.png,.svg"
          className="hidden"
          onChange={(e) => handleFileInput(e.target.files)}
        />
      </div>
    )
  }

  return (
    <div className="min-h-full bg-background px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {resumes.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[500px]">
            <div className=" text-center max-w-md">
              {/* Document Icon */}
              <div className="flex justify-center mb-5">
                <div className="p-5 bg-[#bd94b823] rounded-full flex items-center justify-center">
                  <FileText className="w-12 h-12 text-muted-foreground" />
                </div>
              </div>

              {/* Heading */}
              <h2 className="text-lg md:text-2xl font-semibold mb-2">No Resumes Yet</h2>

              {/* Description */}
              <p className="text-[#494949] md:text-base mb-8">Upload your resume to get started with your job search</p>
              <div className="flex justify-center">
              {/* Upload Button - Toggle upload flow */}
              <Button
                onClick={() => setIsUploadingFlow(true)}
                bg="bg-[#66005e]"
                color="text-white"
                rounded="lg"
                size="lg"
                icon={<Upload className="w-4 h-4" />}
                iconPosition="left"
              >
                Upload Resume
              </Button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-foreground mb-2">Your Resumes</h2>
              <p className="text-muted-foreground">Manage and organize your resume files</p>
            </div>

            {/* Drag and drop area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 mb-6 transition-colors ${
                isDragging
                  ? "border-purple-700 bg-purple-50 dark:bg-purple-950/20"
                  : "border-muted-foreground/30 bg-muted/30"
              }`}
            >
              <div className="flex flex-col items-center justify-center">
                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                <p className="text-foreground font-medium">Drop your resume here</p>
                <p className="text-muted-foreground text-sm">or</p>
                <Button variant="outline" onClick={() => setIsUploadingFlow(true)} className="mt-3 bg-transparent">
                  Browse Files
                </Button>
              </div>
            </div>

            {/* Resumes List */}
            <div className="space-y-3">
              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-950 rounded flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-purple-700 dark:text-purple-300" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground truncate">{resume.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Uploaded {resume.uploadedAt} • {resume.size}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteResume(resume.id)}
                      className="text-muted-foreground hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.xlsx,.pptx,.png,.svg"
          className="hidden"
          onChange={(e) => handleFileInput(e.target.files)}
        />
      </div>
    </div>
  )
}
