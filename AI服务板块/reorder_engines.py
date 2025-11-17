#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
重新排列七大引擎的顺序，使其从上到下按一、二、三、四、五、六、七排列
并且实现左右交替布局：奇数位置左图右文，偶数位置左文右图
"""

import re

def read_file(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(filename, content):
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

def extract_engine_section(content, engine_comment):
    """提取特定引擎的完整代码块"""
    # 找到引擎注释的位置
    pattern = re.escape(engine_comment) + r'.*?(?=\s*{/\* 引擎|\s*</section>\s*\n\s*{/\* 企业级定制)'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        return match.group(0)
    return None

def main():
    # 读取文件
    content = read_file('index.html')
    
    # 提取七个引擎的代码块
    engines = {}
    engine_comments = {
        '一': '{/* 引擎一:AI数字人·7x24直播 */',
        '二': '{/* 引擎二:AI智能选品 */',
        '三': '{/* 引擎三:营销内容生成 */',
        '四': '{/* 引擎四:AI广告投放优化 */',
        '五': '{/* 引擎五:AI矩阵运营·品牌资产 */',
        '六': '{/* 引擎六:AI售后提效·智能客服 */',
        '七': '{/* 引擎七:智慧经营·决策分析 */'
    }
    
    for key, comment in engine_comments.items():
        engine_code = extract_engine_section(content, comment)
        if engine_code:
            engines[key] = engine_code
            print(f"✓ 提取引擎{key}")
        else:
            print(f"✗ 未能提取引擎{key}")
    
    # 检查是否成功提取所有引擎
    if len(engines) != 7:
        print(f"错误：只提取了 {len(engines)} 个引擎，预期 7 个")
        return
    
    # 调整引擎的order类以实现左右交替布局
    # 奇数位置（一、三、五、七）：左图右文（无order）
    # 偶数位置（二、四、六）：左文右图（有order）
    
    def remove_order_classes(code):
        """移除文案区和视觉区的order类"""
        code = re.sub(r'className="order-2 md:order-1"', 'className=""', code)
        code = re.sub(r'className="([^"]*?)\s*order-1 md:order-2\s*([^"]*?)"', r'className="\1\2"', code)
        code = re.sub(r'className="([^"]*?)\s*order-2 md:order-1\s*([^"]*?)"', r'className="\1\2"', code)
        code = re.sub(r'className="\s+"', 'className=""', code)  # 清理空className
        return code
    
    def add_order_classes_left_text(code):
        """添加order类实现左文右图布局"""
        # 在文案区的第一个div添加order-2 md:order-1
        code = re.sub(
            r'(\{/\* 左侧文案区 \*/}\s*<div)(\s+className="[^"]*")?',
            r'\1 className="order-2 md:order-1"',
            code
        )
        code = re.sub(
            r'(\{/\* 右侧视觉区 \*/}\s*<div className="[^"]+)(")([^>]*>)',
            r'\1 order-1 md:order-2\2\3',
            code
        )
        return code
    
    # 处理每个引擎
    processed_engines = {}
    
    # 引擎一、三、五、七：左图右文（移除order）
    for key in ['一', '三', '五', '七']:
        processed_engines[key] = remove_order_classes(engines[key])
        print(f"✓ 处理引擎{key}：左图右文布局")
    
    # 引擎二、四、六：左文右图（添加order）
    for key in ['二', '四', '六']:
        processed_engines[key] = remove_order_classes(engines[key])  # 先移除所有order
        processed_engines[key] = add_order_classes_left_text(processed_engines[key])  # 再添加正确的order
        print(f"✓ 处理引擎{key}：左文右图布局")
    
    # 找到引擎区域的开始和结束位置
    services_start = content.find('{/* 引擎二:AI智能选品 */}')
    services_end = content.find('</section>\n\n          {/* 企业级定制·AI中枢 */')
    
    if services_start == -1 or services_end == -1:
        print("错误：未能找到引擎区域的边界")
        return
    
    # 构建新的引擎区域内容（按一、二、三、四、五、六、七的顺序）
    new_engines_section = '\n\n              '.join([
        processed_engines['一'],
        processed_engines['二'],
        processed_engines['三'],
        processed_engines['四'],
        processed_engines['五'],
        processed_engines['六'],
        processed_engines['七']
    ])
    
    # 替换内容
    new_content = content[:services_start] + new_engines_section + '\n            ' + content[services_end:]
    
    # 写入文件
    write_file('index.html', new_content)
    print("\n✓ 引擎重新排列完成！")
    print("顺序：一、二、三、四、五、六、七")
    print("布局：左图右文、左文右图、左图右文、左文右图、左图右文、左文右图、左图右文")

if __name__ == '__main__':
    main()
