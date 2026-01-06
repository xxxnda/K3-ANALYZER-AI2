import React, { useState } from 'react'
import { Upload, AlertCircle, Shield, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useAnalysis } from '@/hooks/useAnalysis'
import type { LLMAnalysis } from '@/types'

export default function ObjectAnalyzerPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const { loading, error, result, analyze, parseLLMAnalysis } = useAnalysis()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedFile) return
    await analyze(selectedFile)
  }

  const getRiskColor = (level: string) => {
    switch (level?.toUpperCase()) {
      case 'HIGH':
        return 'bg-red-500'
      case 'MEDIUM':
        return 'bg-yellow-500'
      case 'LOW':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  const llmData: LLMAnalysis = result?.analysis.llm_analysis
    ? parseLLMAnalysis(result.analysis.llm_analysis)
    : {}

  const detectedObjects = result?.detected_raw || []
  const uniqueObjects = [...new Set(detectedObjects)]
  const riskLevel = result?.analysis.rule_based_risk_level || 'UNKNOWN'
  const sceneDescription =
    llmData.scene_description || result?.analysis.rule_based_caption || ''
  const hazards =
    llmData.identified_hazards ||
    llmData.risks ||
    result?.analysis.rule_based_risks ||
    []
  const recommendations =
    llmData.safety_recommendations || llmData.recommendations || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-slate-900 flex items-center justify-center gap-3">
            <Shield className="w-10 h-10 text-blue-600" />
            K3 Safety AI Analyzer
          </h1>
          <p className="text-slate-600">
            Upload construction site photos for PPE detection & safety risk analysis
          </p>
        </div>

        {/* Upload Card */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
            <CardDescription>
              Select a photo from your construction site for analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* File Input */}
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer bg-white">
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={loading}
              />
              <label htmlFor="fileInput" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                <div className="text-slate-600 font-medium">
                  {selectedFile ? selectedFile.name : 'Click to select image'}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  JPG, PNG supported
                </div>
              </label>
            </div>

            {/* Preview */}
            {previewUrl && (
              <div className="rounded-lg overflow-hidden bg-black">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full max-h-96 object-contain"
                />
              </div>
            )}

            {/* Analyze Button */}
            <Button
              onClick={handleAnalyze}
              disabled={!selectedFile || loading}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  Analyze Image Now
                </>
              )}
            </Button>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-800">
                  <strong>Error Occurred!</strong>
                  <p>{error}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Detected Objects */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Detected Objects (YOLO)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {uniqueObjects.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {uniqueObjects.map((obj, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="text-xs uppercase font-semibold"
                      >
                        {obj}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 italic text-sm">
                    No objects detected
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Safety Report */}
            <Card className="border-l-4 border-l-yellow-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    Safety Report
                  </CardTitle>
                  <Badge
                    className={`${getRiskColor(riskLevel)} text-white px-4 py-1`}
                  >
                    {riskLevel}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Scene Description */}
                {sceneDescription && (
                  <>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 mb-2">
                        Scene Description
                      </h4>
                      <p className="text-slate-600 text-sm italic">
                        {sceneDescription}
                      </p>
                    </div>
                    <Separator />
                  </>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Hazards */}
                  <div>
                    <h4 className="text-sm font-semibold text-red-600 mb-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Safety Hazards
                    </h4>
                    {hazards.length > 0 ? (
                      <ul className="space-y-2">
                        {hazards.map((hazard, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-slate-700 flex items-start gap-2"
                          >
                            <span className="text-red-500 flex-shrink-0 mt-1">
                              •
                            </span>
                            <span>{hazard}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-slate-500 text-sm italic">
                        No hazards identified
                      </p>
                    )}
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="text-sm font-semibold text-green-600 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Safety Recommendations
                    </h4>
                    {recommendations.length > 0 ? (
                      <ul className="space-y-2">
                        {recommendations.map((rec, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-slate-700 flex items-start gap-2"
                          >
                            <span className="text-green-500 flex-shrink-0 mt-1">
                              •
                            </span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-slate-500 text-sm italic">
                        No recommendations available
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
