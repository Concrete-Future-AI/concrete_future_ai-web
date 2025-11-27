import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Key, Copy, Eye, EyeOff, Trash2, Plus, Play, BookOpen, Code, Terminal, Activity, CheckCircle2, Zap } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const apiKeys = [
  {
    id: 'sk-prod-a7f8...9d2c',
    name: 'Production-API-主应用',
    permission: 'high',
    calls: '156.8K',
    quota: '500K',
    created: '2024-10-15',
    lastUsed: '5分钟前'
  },
  {
    id: 'sk-dev-b2e4...3f1a',
    name: 'Development-测试环境',
    permission: 'medium',
    calls: '23.4K',
    quota: '100K',
    created: '2024-10-20',
    lastUsed: '2小时前'
  },
  {
    id: 'sk-test-c9d1...7e8b',
    name: 'Testing-自动化测试',
    permission: 'low',
    calls: '8.9K',
    quota: '50K',
    created: '2024-10-22',
    lastUsed: '1天前'
  },
];

const codeExamples = {
  python: `import requests

url = "https://api.aetherprime.internal/v1/chat/completions"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

payload = {
    "model": "llama-3-70b",
    "messages": [
        {"role": "system", "content": "你是一个企业AI助手"},
        {"role": "user", "content": "解释什么是RAG技术"}
    ],
    "temperature": 0.7,
    "max_tokens": 2000
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`,

  javascript: `const response = await fetch('https://api.aetherprime.internal/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'llama-3-70b',
    messages: [
      { role: 'system', content: '你是一个企业AI助手' },
      { role: 'user', content: '解释什么是RAG技术' }
    ],
    temperature: 0.7,
    max_tokens: 2000
  })
});

const data = await response.json();
console.log(data);`,

  curl: `curl -X POST https://api.aetherprime.internal/v1/chat/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "llama-3-70b",
    "messages": [
      {"role": "system", "content": "你是一个企业AI助手"},
      {"role": "user", "content": "解释什么是RAG技术"}
    ],
    "temperature": 0.7,
    "max_tokens": 2000
  }'`
};

interface DeveloperPortalProps {
  activeTab: string;
}

export function DeveloperPortal({ activeTab }: DeveloperPortalProps) {
  const [selectedModel, setSelectedModel] = useState('llama-3-70b');
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState([2000]);
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState('python');

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error('请输入提示词');
      return;
    }
    
    setIsGenerating(true);
    setOutput('正在生成中...');
    toast.info('模型正在处理您的请求...');
    
    setTimeout(() => {
      setOutput(`基于模型 ${selectedModel} 的回复:\n\nRAG（Retrieval-Augmented Generation，检索增强生成）是一种将信息检索与语言生成相结合的技术。它通过以下步骤工作：\n\n1. **检索阶段**：系统首先从知识库中检索与用户查询相关的文档片段\n2. **增强阶段**：将检索到的信息作为上下文注入到大语言模型中\n3. **生成阶段**：模型基于增强后的上下文生成更准确、更有依据的回答\n\nRAG技术的主要优势包括：\n- 提供可溯源的信息来源\n- 减少模型幻觉\n- 无需重新训练即可更新知识\n- 适合企业私有知识场景\n\n在智核平台中，我们的RAG系统已接入23个企业知识源，确保AI回答完全基于企业内部可信数据。`);
      setIsGenerating(false);
      toast.success('生成完成');
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('已复制到剪贴板');
  };

  return (
    <Tabs value={activeTab === 'developer' ? 'playground' : 'docs'} className="space-y-6">
      <TabsList className="bg-slate-800 text-slate-300">
        <TabsTrigger value="playground" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
          API实验场
        </TabsTrigger>
        <TabsTrigger value="docs" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white">
          SDK与文档
        </TabsTrigger>
      </TabsList>

      <TabsContent value="playground" className="space-y-6">
        <div>
          <div className="text-lg text-white">API交互实验场</div>
          <div className="text-sm text-slate-400">实时测试API调用，自动生成代码示例</div>
        </div>

        <Card className="border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-white">我的API Key管理</div>
              <div className="text-xs text-slate-400">安全管理您的API访问密钥</div>
            </div>
            <Badge variant="outline" className="border-blue-500/30 bg-blue-500/10 text-blue-400">
              {apiKeys.length} 个密钥
            </Badge>
          </div>
          <div className="space-y-3">
            {apiKeys.map((key) => (
              <div key={key.id} className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/30 p-4 hover:bg-slate-800/50 hover:border-slate-600 transition-all group">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <Key className="h-4 w-4 text-slate-500" />
                    <div className="text-white">{key.name}</div>
                    <Badge variant="outline" className={`text-xs ${
                      key.permission === 'high' ? 'border-red-500/30 bg-red-500/10 text-red-400' :
                      key.permission === 'medium' ? 'border-amber-500/30 bg-amber-500/10 text-amber-400' :
                      'border-green-500/30 bg-green-500/10 text-green-400'
                    }`}>
                      {key.permission === 'high' ? '高权限' : key.permission === 'medium' ? '中权限' : '低权限'}
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center gap-4 text-xs text-slate-400">
                    <span className="font-mono bg-slate-900/50 px-2 py-0.5 rounded">{key.id}</span>
                    <span>•</span>
                    <span>已调用: {key.calls} / {key.quota}</span>
                    <span>•</span>
                    <span>上次使用: {key.lastUsed}</span>
                  </div>
                  <div className="mt-2">
                    <Progress 
                      value={(parseInt(key.calls.replace('K', '000')) / parseInt(key.quota.replace('K', '000'))) * 100} 
                      className="h-1 bg-slate-700" 
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white"
                    onClick={() => copyToClipboard(key.id)}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    复制
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white"
                    onClick={() => toast.info('查看API Key详情')}
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-700 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    onClick={() => toast.success('API Key已吊销')}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => toast.success('新API Key已生成: sk-new-xxx...xxx')}
            >
              <Plus className="mr-2 h-4 w-4" />
              生成新API Key
            </Button>
          </div>
        </Card>

        {/* API Usage Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-slate-400">今日API调用</div>
                <div className="text-xl text-white">45.2K</div>
              </div>
            </div>
          </Card>
          <Card className="border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-slate-400">成功率</div>
                <div className="text-xl text-white">99.8%</div>
              </div>
            </div>
          </Card>
          <Card className="border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-slate-400">平均延迟</div>
                <div className="text-xl text-white">1.2s</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-6 lg:col-span-1">
            <div className="mb-4">
              <div className="text-white">模型配置</div>
              <div className="text-xs text-slate-400">选择模型和参数</div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs text-slate-400">选择模型</label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="border-slate-700 bg-slate-800/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-slate-700 bg-slate-800">
                    <SelectItem value="llama-3-70b">Llama-3-70B</SelectItem>
                    <SelectItem value="chatglm3-6b">ChatGLM3-6B</SelectItem>
                    <SelectItem value="qwen-14b">Qwen-14B</SelectItem>
                    <SelectItem value="codellama-13b">CodeLlama-13B</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-xs text-slate-400">知识库范围</label>
                <Select defaultValue="all">
                  <SelectTrigger className="border-slate-700 bg-slate-800/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-slate-700 bg-slate-800">
                    <SelectItem value="all">所有知识库</SelectItem>
                    <SelectItem value="product">产品文档</SelectItem>
                    <SelectItem value="code">代码库</SelectItem>
                    <SelectItem value="legal">法务合同</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 flex items-center justify-between text-xs text-slate-400">
                  <span>Temperature</span>
                  <span className="text-white">{temperature[0]}</span>
                </label>
                <Slider
                  value={temperature}
                  onValueChange={setTemperature}
                  min={0}
                  max={2}
                  step={0.1}
                  className="[&_[role=slider]]:bg-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center justify-between text-xs text-slate-400">
                  <span>Max Tokens</span>
                  <span className="text-white">{maxTokens[0]}</span>
                </label>
                <Slider
                  value={maxTokens}
                  onValueChange={setMaxTokens}
                  min={100}
                  max={4000}
                  step={100}
                  className="[&_[role=slider]]:bg-blue-500"
                />
              </div>
            </div>
          </Card>

          <Card className="border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-white">Prompt输入</div>
                <div className="text-xs text-slate-400">输入您的问题或指令</div>
              </div>
              <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                {prompt.length} 字符
              </Badge>
            </div>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="请输入您的问题或提示词，例如：解释什么是RAG技术..."
              className="min-h-[300px] border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 resize-none focus:ring-2 focus:ring-blue-500/50"
            />
            <div className="mt-4 flex gap-2">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play className="mr-2 h-4 w-4" />
                {isGenerating ? '生成中...' : '生成回复'}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setPrompt('');
                  setOutput('');
                }}
                className="border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                清空
              </Button>
            </div>
          </Card>

          <Card className="border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-white">模型输出</div>
                <div className="text-xs text-slate-400">AI生成的回复内容</div>
              </div>
              {output && (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700"
                  onClick={() => copyToClipboard(output)}
                >
                  <Copy className="mr-1 h-3 w-3" />
                  复制
                </Button>
              )}
            </div>
            <div className="min-h-[300px] rounded-lg border border-slate-700 bg-slate-900/50 p-4">
              <pre className="whitespace-pre-wrap text-sm text-slate-300">
                {output || '输出结果将在这里显示...'}
              </pre>
            </div>
          </Card>
        </div>

        <Card className="border-slate-800 bg-[#0d1117] p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-white">API请求代码</div>
              <div className="text-xs text-slate-400">根据上述配置自动生成</div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={codeLanguage} onValueChange={setCodeLanguage}>
                <SelectTrigger className="w-[120px] border-slate-700 bg-slate-800/50 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-slate-700 bg-slate-800">
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="curl">cURL</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700"
                onClick={() => copyToClipboard(codeExamples[codeLanguage as keyof typeof codeExamples])}
              >
                <Copy className="mr-1 h-3 w-3" />
                复制代码
              </Button>
            </div>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
            <pre className="overflow-x-auto text-xs text-slate-300">
              <code>{codeExamples[codeLanguage as keyof typeof codeExamples]}</code>
            </pre>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="docs" className="space-y-6">
        <div>
          <div className="text-lg text-white">SDK与开发文档</div>
          <div className="text-sm text-slate-400">完整的API文档和SDK下载</div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { name: 'Python SDK', version: 'v2.5.1', icon: Code, color: 'blue' },
            { name: 'JavaScript SDK', version: 'v2.4.8', icon: Code, color: 'yellow' },
            { name: 'Java SDK', version: 'v2.3.2', icon: Code, color: 'orange' },
            { name: 'Go SDK', version: 'v1.9.5', icon: Code, color: 'cyan' },
            { name: 'REST API文档', version: 'v1.0', icon: BookOpen, color: 'purple' },
            { name: 'WebSocket API', version: 'v1.0', icon: Terminal, color: 'green' },
          ].map((sdk) => (
            <Card key={sdk.name} className="border-slate-800 bg-[#0d1117] p-5">
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-${sdk.color}-500/10`}>
                  <sdk.icon className={`h-6 w-6 text-${sdk.color}-400`} />
                </div>
                <div className="flex-1">
                  <div className="text-white">{sdk.name}</div>
                  <div className="mt-1 text-xs text-slate-400">{sdk.version}</div>
                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" size="sm" className="border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700">
                      下载
                    </Button>
                    <Button variant="outline" size="sm" className="border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700">
                      文档
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="border-slate-800 bg-[#0d1117] p-6">
          <div className="mb-4 text-white">快速开始指南</div>
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-xs text-blue-400">1</div>
                <div className="flex-1">
                  <div className="text-sm text-white">安装SDK</div>
                  <div className="mt-2 rounded bg-slate-900 p-2 font-mono text-xs text-slate-300">
                    pip install aetherprime-sdk
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-xs text-blue-400">2</div>
                <div className="flex-1">
                  <div className="text-sm text-white">配置API Key</div>
                  <div className="mt-2 rounded bg-slate-900 p-2 font-mono text-xs text-slate-300">
                    export AETHERPRIME_API_KEY=your_api_key_here
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-xs text-blue-400">3</div>
                <div className="flex-1">
                  <div className="text-sm text-white">开始调用</div>
                  <div className="mt-2 text-xs text-slate-400">参考右侧代码示例或查看完整文档</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
