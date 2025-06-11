"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain, CheckCircle2, AlertTriangle, ArrowRight, Settings, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { ParameterCard } from "@/components/parameter-card"
import { TypewriterEffect } from "@/components/typewriter-effect"
import { MachineDiagram } from "@/components/machine-diagram"
import { PulsingDot } from "@/components/pulsing-dot"

export default function Home() {
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showDiagram, setShowDiagram] = useState(false)
  const [showCompletion, setShowCompletion] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnalysisComplete(true)
    }, 3000)

    const diagramTimer = setTimeout(() => {
      setShowDiagram(true)
    }, 4000)

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return prevProgress + 4
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      clearTimeout(diagramTimer)
      clearInterval(interval)
    }
  }, [])

  const parameters = [
    { name: "主轴压力", current: "5.2 MPa", recommended: "6.8 MPa", status: "increase" },
    { name: "侧向压力", current: "3.7 MPa", recommended: "3.2 MPa", status: "decrease" },
    { name: "底部压力", current: "4.5 MPa", recommended: "4.5 MPa", status: "maintain" },
    { name: "冷却液压力", current: "2.1 MPa", recommended: "2.5 MPa", status: "increase" },
  ]

  const steps = [
    "进入机床控制面板",
    "选择参数设置选项",
    "按照推荐值调整各项压力参数",
    "确认并保存设置",
    "进行测试运行验证参数效果",
  ]

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="sticky top-0 z-20 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center">
              <Brain className="h-4 w-4 text-white" />
            </div>
            {!analysisComplete && <PulsingDot />}
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">瑞元 · 数智</h1>
            <p className="text-xs text-gray-400">AI智能参数助手</p>
          </div>
        </div>
        <Badge
          className={cn(
            "px-3 py-1 rounded-full text-xs font-medium border-0",
            analysisComplete ? "bg-green-500/10 text-green-400" : "bg-purple-500/10 text-purple-400",
          )}
        >
          {analysisComplete ? "✓ 分析完成" : "⚡ 分析中..."}
        </Badge>
      </header>

      <div className="p-6 space-y-6 pb-24">
        {!analysisComplete ? (
          <Card className="bg-[#1a1a1a] border-white/5 rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-3 text-white">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center">
                  <Settings className="h-3 w-3 text-white animate-spin" />
                </div>
                正在分析机床参数
              </CardTitle>
              <p className="text-sm text-gray-400">基于作业标准智能分析最佳参数配置</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative">
                <Progress value={progress} className="h-2 bg-gray-800 rounded-full" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {["收集机床数据", "分析作业标准", "计算最佳参数", "生成调整方案"].map((text, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50">
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                    <span className="text-sm text-gray-300">{text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6 animate-fadeIn">
            <Card className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 border-purple-500/20 rounded-2xl">
              
            </Card>

            <Card className="bg-[#1a1a1a] border-white/5 rounded-2xl">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
                    <AlertTriangle className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="font-medium text-white">问题诊断</h3>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-gray-300 leading-relaxed">
                  <TypewriterEffect text="当前机床压力参数与标准作业要求存在偏差，可能导致产品精度不足和设备磨损加剧。主轴压力不足导致切削不稳定，侧向压力过大引起工件变形。" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-white/5 rounded-2xl">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <CheckCircle2 className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="font-medium text-white">解决方案</h3>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-gray-300 leading-relaxed">
                  <TypewriterEffect text="根据作业标准和当前工件特性，建议调整机床压力参数以优化加工精度和设备寿命。主轴压力需提高以确保切削稳定性，侧向压力应适当降低以减少工件变形。" />
                </div>
              </CardContent>
            </Card>

            <div className="relative">
              <MachineDiagram
                className={cn(
                  "transition-all duration-700 transform",
                  showDiagram ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              {parameters.map((param, index) => (
                <ParameterCard key={index} parameter={param} delay={index * 200 + 500} />
              ))}
            </div>

            <Card className="bg-[#1a1a1a] border-white/5 rounded-2xl">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center">
                    <Settings className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="font-medium text-white">操作步骤</h3>
                </div>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {steps.map((step, index) => (
                    <li
                      key={index}
                      className="flex gap-4 items-start animate-slideIn"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 text-sm font-medium mt-0.5">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-300 leading-relaxed">{step}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-white/5 rounded-2xl">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                    <AlertTriangle className="h-3 w-3 text-white" />
                  </div>
                  <h3 className="font-medium text-white">注意事项</h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "参数调整过程中确保机床处于停机状态",
                  "调整后进行小批量测试，确认参数效果",
                  "如遇异常情况，立即停机并联系技术支持",
                ].map((text, index) => (
                  <p
                    key={index}
                    className="flex items-start gap-3 animate-fadeIn text-gray-300"
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                  >
                    <AlertTriangle className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
                    <span>{text}</span>
                  </p>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {analysisComplete && !showCompletion && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-[#0a0a0a]/80 backdrop-blur-xl border-t border-white/5 animate-slideUp z-20">
          <Button
            className="w-full h-12 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-medium rounded-xl border-0 transition-all duration-300"
            onClick={() => setShowCompletion(true)}
          >
            <span className="flex items-center gap-3">
              确认完成调整
              <ArrowRight className="h-4 w-4" />
            </span>
          </Button>
        </div>
      )}

      {showCompletion && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fadeIn">
          <Card className="w-full max-w-sm bg-[#1a1a1a] border-white/10 rounded-2xl animate-slideUp">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-xl font-semibold text-white">小瑞</CardTitle>
              <p className="text-sm text-gray-400">AI智能助手</p>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="bg-gray-800/50 rounded-xl p-4">
                <div className="text-gray-300 leading-relaxed">
                  <TypewriterEffect text="小瑞已复核完成，压力参数设置准确，排除风险可能" speed={50} />
                </div>
              </div>
              <Button
                className="w-full h-10 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-medium rounded-xl border-0 transition-all duration-300"
                onClick={() => setShowCompletion(false)}
              >
                确认
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  )
}
