import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MachineDiagramProps {
  className?: string
}

export function MachineDiagram({ className }: MachineDiagramProps) {
  return (
    <Card className={cn("bg-[#1a1a1a] border-white/5 rounded-2xl", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-3 text-white">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center">
            <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7 8L3 12L7 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 8L21 12L17 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 4L10 20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          机床压力参数示意图
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div className="relative w-full max-w-xs aspect-square bg-gray-800/30 rounded-2xl p-6 border border-white/5">
          {/* 机床示意图 */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 h-3/5 bg-gray-700 rounded-xl"></div>

          {/* 主轴压力 */}
          <div
            className="absolute top-[15%] left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-fadeIn"
            style={{ animationDelay: "200ms" }}
          >
            <div className="w-1 h-10 bg-purple-400 rounded-full"></div>
            <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
              1
            </div>
          </div>

          {/* 侧向压力 */}
          <div
            className="absolute top-1/2 left-[15%] transform -translate-y-1/2 flex items-center animate-fadeIn"
            style={{ animationDelay: "400ms" }}
          >
            <div className="h-1 w-10 bg-yellow-400 rounded-full"></div>
            <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
              2
            </div>
          </div>

          {/* 底部压力 */}
          <div
            className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-fadeIn"
            style={{ animationDelay: "600ms" }}
          >
            <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-gray-500 to-gray-600 flex items-center justify-center text-white text-xs font-bold">
              3
            </div>
            <div className="w-1 h-10 bg-gray-400 rounded-full"></div>
          </div>

          {/* 冷却液压力 */}
          <div
            className="absolute top-1/2 right-[15%] transform -translate-y-1/2 flex items-center animate-fadeIn"
            style={{ animationDelay: "800ms" }}
          >
            <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
              4
            </div>
            <div className="h-1 w-10 bg-blue-400 rounded-full"></div>
          </div>

          {/* 图例 */}
          <div className="absolute bottom-3 left-3 right-3 grid grid-cols-2 gap-1 text-[10px] text-gray-400">
            <span className="text-center">1: 主轴压力</span>
            <span className="text-center">2: 侧向压力</span>
            <span className="text-center">3: 底部压力</span>
            <span className="text-center">4: 冷却液</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
