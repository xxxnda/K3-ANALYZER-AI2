import React, { useState } from 'react'
import { 
  Upload, 
  AlertCircle, 
  Shield, 
  CheckCircle2, 
  Loader2, 
  ShieldCheck,
  AlertTriangle,
  Image as ImageIcon,
  TrendingUp,
  BarChart3
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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

  const getRiskBgColor = (level: string) => {
    switch (level?.toUpperCase()) {
      case 'HIGH':
        return 'bg-red-500'
      case 'MEDIUM':
        return 'bg-amber-500'
      case 'LOW':
        return 'bg-green-500'
      default:
        return 'bg-slate-400'
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level?.toUpperCase()) {
      case 'HIGH':
        return <AlertCircle className="w-5 h-5" />
      case 'MEDIUM':
        return <AlertTriangle className="w-5 h-5" />
      case 'LOW':
        return <CheckCircle2 className="w-5 h-5" />
      default:
        return <Shield className="w-5 h-5" />
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
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
                <ShieldCheck className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold tracking-tight">
              K3 Safety AI Analyzer
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              AI-powered PPE detection & safety risk analysis for construction sites
            </p>
            <p className="text-blue-200 text-sm max-w-xl mx-auto">
              Upload site photos to instantly identify safety equipment and potential hazards using advanced computer vision
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Upload Section */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="border-b bg-slate-50/50">
            <CardTitle className="text-xl flex items-center gap-2">
              <Upload className="w-5 h-5 text-blue-600" />
              Upload Construction Site Photo
            </CardTitle>
            <CardDescription>
              Select a photo (JPG, PNG) to analyze PPE compliance and identify safety risks
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Drag & Drop Area */}
            <div className="relative">
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={loading}
              />
              <label 
                htmlFor="fileInput" 
                className="block cursor-pointer group"
              >
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-200 bg-white group-hover:shadow-md">
                  {!selectedFile ? (
                    <>
                      <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                        <ImageIcon className="w-10 h-10 text-blue-600" />
                      </div>
                      <div className="text-slate-700 font-semibold text-lg mb-2">
                        Click to upload or drag and drop
                      </div>
                      <div className="text-sm text-slate-500">
                        Construction site photo (JPG, PNG)
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      </div>
                      <div className="text-slate-700 font-semibold mb-1">
                        {selectedFile.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        Click to change image
                      </div>
                    </>
                  )}
                </div>
              </label>
            </div>

            {/* Preview */}
            {previewUrl && (
              <div className="rounded-xl overflow-hidden bg-slate-900 shadow-lg border-2 border-slate-200">
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
              className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Analyzing PPE & Safety Risks...
                </>
              ) : (
                <>
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Analyze Safety Risks
                </>
              )}
            </Button>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-800">
                  <strong className="block mb-1">Analysis Error</strong>
                  <p>{error}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Card className="border-2 shadow-xl">
              <CardHeader className="border-b bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getRiskBgColor(riskLevel)} text-white`}>
                        {getRiskIcon(riskLevel)}
                      </div>
                      Safety Analysis Results
                    </CardTitle>
                    <CardDescription className="mt-2">
                      Comprehensive safety assessment powered by AI
                    </CardDescription>
                  </div>
                  <Badge 
                    className={`${getRiskBgColor(riskLevel)} text-white px-6 py-2 text-base font-bold`}
                  >
                    {riskLevel} RISK
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="detection" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 h-12 bg-slate-100">
                    <TabsTrigger value="detection" className="text-base font-medium">
                      <Shield className="w-4 h-4 mr-2" />
                      Detection
                    </TabsTrigger>
                    <TabsTrigger value="insights" className="text-base font-medium">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Safety Analysis
                    </TabsTrigger>
                  </TabsList>

                  {/* Detection Tab */}
                  <TabsContent value="detection" className="space-y-6 mt-6">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                        Detected Objects
                      </h3>
                      {uniqueObjects.length > 0 ? (
                        <div className="bg-slate-50 rounded-lg p-6 border-2 border-slate-200">
                          <div className="flex flex-wrap gap-3">
                            {uniqueObjects.map((obj, idx) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="text-sm px-4 py-2 font-semibold uppercase tracking-wide bg-blue-100 text-blue-700 hover:bg-blue-200"
                              >
                                {obj}
                              </Badge>
                            ))}
                          </div>
                          <div className="mt-4 text-sm text-slate-600">
                            <strong>{uniqueObjects.length}</strong> unique object{uniqueObjects.length !== 1 ? 's' : ''} detected
                          </div>
                        </div>
                      ) : (
                        <div className="bg-slate-50 rounded-lg p-8 border-2 border-dashed border-slate-300 text-center">
                          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                          <p className="text-slate-500 font-medium">
                            No objects detected in this image
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Overall Status */}
                    <div className={`rounded-xl p-6 border-2 ${
                      riskLevel === 'HIGH' 
                        ? 'bg-red-50 border-red-200' 
                        : riskLevel === 'MEDIUM'
                        ? 'bg-amber-50 border-amber-200'
                        : 'bg-green-50 border-green-200'
                    }`}>
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-full ${getRiskBgColor(riskLevel)} text-white`}>
                          {getRiskIcon(riskLevel)}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-slate-800 mb-1">
                            Overall Safety Status: {riskLevel}
                          </h4>
                          <p className="text-slate-600">
                            {riskLevel === 'HIGH' && 'Critical safety issues detected. Immediate action required.'}
                            {riskLevel === 'MEDIUM' && 'Moderate safety concerns identified. Review recommended.'}
                            {riskLevel === 'LOW' && 'Safety conditions appear satisfactory. Continue monitoring.'}
                            {riskLevel === 'UNKNOWN' && 'Safety level could not be determined.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Safety Analysis Tab */}
                  <TabsContent value="insights" className="space-y-6 mt-6">
                    {/* Scene Description */}
                    {sceneDescription && (
                      <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                        <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                          <ImageIcon className="w-5 h-5" />
                          Scene Analysis
                        </h3>
                        <p className="text-slate-700 leading-relaxed">
                          {sceneDescription}
                        </p>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Safety Hazards */}
                      <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                        <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5" />
                          Identified Hazards
                        </h3>
                        {hazards.length > 0 ? (
                          <ul className="space-y-3">
                            {hazards.map((hazard, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-3 text-slate-700"
                              >
                                <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                                  {idx + 1}
                                </div>
                                <span className="leading-relaxed">{hazard}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="text-center py-4">
                            <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto mb-2" />
                            <p className="text-slate-600 font-medium">
                              No immediate hazards identified
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Safety Recommendations */}
                      <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                        <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5" />
                          Recommendations
                        </h3>
                        {recommendations.length > 0 ? (
                          <ul className="space-y-3">
                            {recommendations.map((rec, idx) => {
                              const recText = typeof rec === 'string' ? rec : rec.recommendation
                              const priority = typeof rec === 'object' ? rec.priority : null
                              const reason = typeof rec === 'object' ? rec.reason : null
                              
                              return (
                                <li
                                  key={idx}
                                  className="flex items-start gap-3"
                                >
                                  <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                                    {idx + 1}
                                  </div>
                                  <div className="flex-1">
                                    {priority && (
                                      <Badge className={`mb-1 ${
                                        priority === 'HIGH' ? 'bg-red-500' :
                                        priority === 'MEDIUM' ? 'bg-amber-500' :
                                        'bg-blue-500'
                                      } text-white text-xs`}>
                                        {priority}
                                      </Badge>
                                    )}
                                    <p className="text-slate-700 leading-relaxed">{recText}</p>
                                    {reason && (
                                      <p className="text-slate-500 text-sm mt-1 italic">→ {reason}</p>
                                    )}
                                  </div>
                                </li>
                              )
                            })}
                          </ul>
                        ) : (
                          <div className="text-center py-4">
                            <Shield className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                            <p className="text-slate-600 font-medium">
                              No specific recommendations at this time
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto px-6 py-8 mt-12 text-center text-slate-500 text-sm border-t border-slate-200">
        <p>K3 Safety AI Analyzer • Enterprise Safety Solutions • Powered by Advanced Computer Vision</p>
      </div>
    </div>
  )
}
