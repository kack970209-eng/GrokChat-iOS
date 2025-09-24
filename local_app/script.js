// 全局变量
let currentSection = 'home';
let favorites = JSON.parse(localStorage.getItem('pythonSiteFavorites')) || [];
let notes = JSON.parse(localStorage.getItem('pythonSiteNotes')) || [];

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadContent();
    setupEventListeners();
});

// 初始化应用
function initializeApp() {
    // 设置导航事件
    setupNavigation();
    // 加载收藏和笔记
    loadFavorites();
    loadNotes();
    // 注册Service Worker (PWA支持)
    registerServiceWorker();
}

// 设置导航功能
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    // 导航链接点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            showSection(section);
            
            // 移动端关闭菜单
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // 移动端菜单切换
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// 显示指定章节
function showSection(sectionName) {
    // 隐藏所有章节
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // 显示目标章节
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionName;
        
        // 更新导航状态
        updateNavigation(sectionName);
        
        // 根据章节加载相应内容
        loadSectionContent(sectionName);
    }
}

// 更新导航状态
function updateNavigation(activeSection) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === activeSection) {
            link.classList.add('active');
        }
    });
}

// 加载章节内容
function loadSectionContent(section) {
    switch(section) {
        case 'syntax':
            loadSyntaxContent();
            break;
        case 'dependencies':
            loadDependenciesContent();
            break;
        case 'examples':
            loadExamplesContent();
            break;
        case 'favorites':
            loadFavoritesContent();
            break;
    }
}

// 加载语法内容
function loadSyntaxContent() {
    // 默认显示基础语法
    showSyntaxDetail('basic');
}

// 显示语法详情
function showSyntaxDetail(category) {
    const detailDiv = document.getElementById('syntax-detail');
    detailDiv.classList.remove('hidden');
    
    const syntaxData = {
        basic: {
            title: '基础语法',
            content: `
                <h3>变量和数据类型</h3>
                <div class="code-block">
                    <button class="copy-btn" onclick="copyCode(this)">复制</button>
                    <pre># 变量定义
name = "Python"
age = 30
height = 1.75
is_student = True

# 数据类型检查
print(type(name))    # &lt;class 'str'&gt;
print(type(age))     # &lt;class 'int'&gt;
print(type(height))  # &lt;class 'float'&gt;
print(type(is_student)) # &lt;class 'bool'&gt;</pre>
                </div>
                
                <h3>字符串操作</h3>
                <div class="code-block">
                    <button class="copy-btn" onclick="copyCode(this)">复制</button>
                    <pre># 字符串格式化
name = "张三"
age = 25
message = f"我叫{name}，今年{age}岁"
print(message)

# 字符串方法
text = "Hello World"
print(text.upper())     # HELLO WORLD
print(text.lower())     # hello world
print(text.replace("World", "Python"))  # Hello Python</pre>
                </div>
                
                <h3>列表操作</h3>
                <div class="code-block">
                    <button class="copy-btn" onclick="copyCode(this)">复制</button>
                    <pre># 列表创建和操作
fruits = ["苹果", "香蕉", "橙子"]
fruits.append("葡萄")
fruits.insert(1, "草莓")
print(fruits)  # ['苹果', '草莓', '香蕉', '橙子', '葡萄']

# 列表推导式
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers]
print(squares)  # [1, 4, 9, 16, 25]</pre>
                </div>
            `
        },
        control: {
            title: '控制结构',
            content: `
                <h3>条件语句</h3>
                <div class="code-block">
                    <button class="copy-btn" onclick="copyCode(this)">复制</button>
                    <pre># if-elif-else 语句
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "D"

print(f"成绩: {grade}")

# 三元运算符
result = "及格" if score >= 60 else "不及格"
print(result)</pre>
                </div>
                
                <h3>循环结构</h3>
                <div class="code-block">
                    <button class="copy-btn" onclick="copyCode(this)">复制</button>
                    <pre># for 循环
fruits = ["苹果", "香蕉", "橙子"]
for fruit in fruits:
    print(f"我喜欢{fruit}")

# 带索引的循环
for index, fruit in enumerate(fruits):
    print(f"{index + 1}. {fruit}")

# while 循环
count = 0
while count < 5:
    print(f"计数: {count}")
    count += 1

# range 函数
for i in range(1, 11, 2):  # 1到10，步长为2
    print(i)  # 1, 3, 5, 7, 9</pre>
                </div>
                
                <h3>异常处理</h3>
                <div class="code-block">
                    <button class="copy-btn" onclick="copyCode(this)">复制</button>
                    <pre># try-except 语句
try:
    number = int(input("请输入一个数字: "))
    result = 10 / number
    print(f"结果: {result}")
except ValueError:
    print("输入的不是有效数字")
except ZeroDivisionError:
    print("不能除以零")
except Exception as e:
    print(f"发生错误: {e}")
finally:
    print("程序执行完毕")</pre>
                </div>
            `
        },
        functions: {
            title: '函数与模块',
            content: `
                <h3>函数定义</h3>
                <div class="code-block">
                    <button class="copy-btn" onclick="copyCode(this)">复制</button>
                    <pre># 基本函数定义
def greet(name, age=18):
    """问候函数"""
    return f"你好，{name}！你今年{age}岁。"

# 函数调用
message = greet("小明")
print(message)

message2 = greet("小红", 20)
print(message2)

# 可变参数
def sum_numbers(*args):
    return sum(args)

result = sum_numbers(1, 2, 3, 4, 5)
print(f"总和: {result}")  # 总和: 15</pre>
                </div>
                
                <h3>Lambda函数</h3>
                <div class="code-block">
                    <button class="copy-btn" onclick="copyCode(this)">复制</button>
                    <pre># Lambda 表达式
square = lambda x: x ** 2
print(square(5))  # 25

# 与内置函数结合使用
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# 过滤偶数
even_numbers = list(filter(lambda x: x % 2 == 0, numbers))
print(even_numbers)  # [2, 4]</pre>
                </div>
                
                <h3>模块导入</h3>
                <div class="code-block">
                    <button class="copy-btn" onclick="copyCode(this)">复制</button>
                    <pre># 导入整个模块
import math
print(math.pi)  # 3.141592653589793
print(math.sqrt(16))  # 4.0

# 导入特定函数
from datetime import datetime, timedelta
now = datetime.now()
print(now)

# 使用别名
import numpy as np
arr = np.array([1, 2, 3, 4, 5])
print(arr.mean())  # 3.0</pre>
                </div>
            `
        },
        oop: {
            title: '面向对象编程',
            content: `
                <h3>类的定义</h3>
                <div class="code-block">
                    <button class="copy-btn" onclick="copyCode(this)">复制</button>
                    <pre># 基本类定义
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        return f"我叫{self.name}，今年{self.age}岁"
    
    def have_birthday(self):
        self.age += 1
        print(f"{self.name}过生日了，现在{self.age}岁")

# 创建对象
person = Person("小明", 20)
print(person.introduce())
person.have_birthday()</pre>
                </div>
                
                <h3>继承</h3>
                <div class="code-block">
                    <button class="copy-btn" onclick="copyCode(this)">复制</button>
                    <pre># 继承示例
class Student(Person):
    def __init__(self, name, age, student_id):
        super().__init__(name, age)
        self.student_id = student_id
        self.grades = []
    
    def add_grade(self, grade):
        self.grades.append(grade)
    
    def get_average(self):
        if self.grades:
            return sum(self.grades) / len(self.grades)
        return 0
    
    def introduce(self):
        base_intro = super().introduce()
        return f"{base_intro}，学号是{self.student_id}"

# 使用继承
student = Student("小红", 18, "2023001")
print(student.introduce())
student.add_grade(85)
student.add_grade(92)
print(f"平均成绩: {student.get_average()}")</pre>
                </div>
                
                <h3>特殊方法</h3>
                <div class="code-block">
                    <button class="copy-btn" onclick="copyCode(this)">复制</button>
                    <pre># 特殊方法（魔术方法）
class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages
    
    def __str__(self):
        return f"《{self.title}》- {self.author}"
    
    def __len__(self):
        return self.pages
    
    def __eq__(self, other):
        if isinstance(other, Book):
            return self.title == other.title and self.author == other.author
        return False

# 使用特殊方法
book1 = Book("Python编程", "张三", 300)
book2 = Book("Python编程", "张三", 300)

print(book1)  # 《Python编程》- 张三
print(len(book1))  # 300
print(book1 == book2)  # True</pre>
                </div>
            `
        }
    };
    
    const data = syntaxData[category];
    if (data) {
        detailDiv.innerHTML = `
            <h2>${data.title}</h2>
            ${data.content}
        `;
    }
}

// 加载依赖内容
function loadDependenciesContent() {
    showDepTab('pip');
}

// 显示依赖标签页
function showDepTab(tab) {
    const contentDiv = document.getElementById('dep-content');
    
    // 更新标签状态
    document.querySelectorAll('.dep-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const depData = {
        pip: {
            title: 'pip 包管理器',
            content: `
                <h3>基本使用</h3>
                <div class="code-block">
                    <button class="copy-btn" onclick="copyCode(this)">复制</button>
                    <pre># 安装包
pip install requests
pip install numpy pandas matplotlib

# 安装特定版本
pip install Django==3.2.0
pip install "Django>=3.0,<4.0"

# 从requirements.txt安装
pip install -r requirements.txt</pre>
                </div>
                
                <h3>包管理命令</h3>
                <div class="code-block">
                    <button class="copy-btn" onclick="copyCode(this)">复制</button>
                    <pre># 查看已安装的包
pip list
pip list --outdated

# 显示包信息
pip show requests

# 卸载包
pip uninstall requests

# 升级包
pip install --upgrade requests
pip install -U requests</pre>
                </div>
                
                <h3>国内镜像源</h3>
                <div class="code-block">
                    <button class="copy-btn" onclick="copyCode(this)">复制</button>
                    <pre># 使用清华镜像源
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ requests

# 永久配置镜像源（Windows）
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple/

# 永久配置镜像源（Linux/Mac）
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple/</pre>
                </div>
            `
        },
        conda: {
            title: 'Conda 环境管理',
            content: `
                <h3>环境管理</h3>
                <div class="code-block">
                    <button class="copy-btn" onclick="copyCode(this)">复制</button>
                    <pre># 创建新环境
conda create -n myenv python=3.9
conda create -n dataenv python=3.8 numpy pandas

# 激活环境
conda activate myenv

# 退出环境
conda deactivate

# 查看所有环境
conda env list
conda info --envs</pre>
                </div>
                
                <h3>包管理</h3>
                <div class="code-block">
                    <button class="copy-btn" onclick="copyCode(this)">复制</button>
                    <pre># 安装包
conda install numpy
conda install -c conda-forge matplotlib

# 查看已安装包
conda list

# 更新包
conda update numpy
conda update --all

# 删除包
conda remove numpy</pre>
                </div>
                
                <h3>环境导出和导入</h3>
                <div class="code-block">
                    <button class="copy-btn" onclick="copyCode(this)">复制</button>
                    <pre># 导出环境
conda env export > environment.yml

# 从文件创建环境
conda env create -f environment.yml

# 删除环境
conda env remove -n myenv</pre>
                </div>
            `
        },
        venv: {
            title: '虚拟环境',
            content: `
                <h3>创建虚拟环境</h3>
                <div class="code-block">
                    <button class="copy-btn" onclick="copyCode(this)">复制</button>
                    <pre># 使用venv创建虚拟环境
python -m venv myproject
python -m venv --system-site-packages myproject

# 使用virtualenv创建
pip install virtualenv
virtualenv myproject
virtualenv -p python3.9 myproject</pre>
                </div>
                
                <h3>激活和使用</h3>
                <div class="code-block">
                    <button class="copy-btn" onclick="copyCode(this)">复制</button>
                    <pre># Windows激活
myproject\\Scripts\\activate

# Linux/Mac激活
source myproject/bin/activate

# 退出虚拟环境
deactivate

# 查看Python路径
which python
where python</pre>
                </div>
                
                <h3>最佳实践</h3>
                <div class="code-block">
                    <button class="copy-btn" onclick="copyCode(this)">复制</button>
                    <pre># 项目结构建议
myproject/
├── venv/          # 虚拟环境
├── src/           # 源代码
├── tests/         # 测试文件
├── requirements.txt
├── README.md
└── .gitignore

# .gitignore 内容
venv/
__pycache__/
*.pyc
.env</pre>
                </div>
            `
        },
        requirements: {
            title: 'requirements.txt',
            content: `
                <h3>生成requirements.txt</h3>
                <div class="code-block">
                    <button class="copy-btn" onclick="copyCode(this)">复制</button>
                    <pre># 生成当前环境的依赖列表
pip freeze > requirements.txt

# 只包含项目直接依赖（推荐）
pip install pipreqs
pipreqs . --encoding=utf8</pre>
                </div>
                
                <h3>requirements.txt格式</h3>
                <div class="code-block">
                    <button class="copy-btn" onclick="copyCode(this)">复制</button>
                    <pre># 基本格式
requests==2.28.1
numpy>=1.21.0
pandas>=1.3.0,<2.0.0
matplotlib

# 从Git仓库安装
git+https://github.com/user/repo.git

# 从本地路径安装
-e ./local_package

# 包含注释
# Web框架
Django==4.1.0
# 数据处理
pandas==1.5.0</pre>
                </div>
                
                <h3>安装和管理</h3>
                <div class="code-block">
                    <button class="copy-btn" onclick="copyCode(this)">复制</button>
                    <pre># 安装依赖
pip install -r requirements.txt

# 升级所有依赖
pip install -r requirements.txt --upgrade

# 检查依赖冲突
pip check

# 生成开发环境依赖
pip freeze > requirements-dev.txt</pre>
                </div>
            `
        }
    };
    
    const data = depData[tab];
    if (data) {
        contentDiv.innerHTML = `
            <h2>${data.title}</h2>
            ${data.content}
        `;
    }
}

// 加载示例内容
function loadExamplesContent() {
    const examplesGrid = document.getElementById('examples-grid');
    
    const examples = [
        {
            id: 'web-scraping',
            title: '网页爬虫',
            category: 'web',
            description: '使用requests和BeautifulSoup爬取网页数据',
            code: `import requests
from bs4 import BeautifulSoup

# 发送HTTP请求
url = "https://example.com"
response = requests.get(url)

# 解析HTML
soup = BeautifulSoup(response.text, 'html.parser')

# 提取数据
titles = soup.find_all('h2')
for title in titles:
    print(title.text.strip())`
        },
        {
            id: 'data-analysis',
            title: '数据分析',
            category: 'data',
            description: '使用pandas进行数据分析和可视化',
            code: `import pandas as pd
import matplotlib.pyplot as plt

# 读取数据
df = pd.read_csv('data.csv')

# 数据概览
print(df.head())
print(df.describe())

# 数据可视化
df['column'].plot(kind='hist')
plt.title('数据分布')
plt.show()

# 数据分组统计
grouped = df.groupby('category').mean()
print(grouped)`
        },
        {
            id: 'file-automation',
            title: '文件自动化',
            category: 'automation',
            description: '批量处理文件和文件夹操作',
            code: `import os
import shutil
from pathlib import Path

# 批量重命名文件
folder_path = Path("./images")
for i, file in enumerate(folder_path.glob("*.jpg")):
    new_name = f"image_{i+1:03d}.jpg"
    file.rename(folder_path / new_name)

# 按类型整理文件
def organize_files(source_dir):
    extensions = {
        'images': ['.jpg', '.png', '.gif'],
        'documents': ['.pdf', '.docx', '.txt'],
        'videos': ['.mp4', '.avi', '.mov']
    }
    
    for category, exts in extensions.items():
        category_dir = Path(source_dir) / category
        category_dir.mkdir(exist_ok=True)
        
        for ext in exts:
            for file in Path(source_dir).glob(f"*{ext}"):
                shutil.move(str(file), str(category_dir / file.name))`
        },
        {
            id: 'api-client',
            title: 'API客户端',
            category: 'web',
            description: '创建RESTful API客户端',
            code: `import requests
import json

class APIClient:
    def __init__(self, base_url, api_key=None):
        self.base_url = base_url
        self.session = requests.Session()
        if api_key:
            self.session.headers.update({'Authorization': f'Bearer {api_key}'})
    
    def get(self, endpoint, params=None):
        url = f"{self.base_url}/{endpoint}"
        response = self.session.get(url, params=params)
        response.raise_for_status()
        return response.json()
    
    def post(self, endpoint, data=None):
        url = f"{self.base_url}/{endpoint}"
        response = self.session.post(url, json=data)
        response.raise_for_status()
        return response.json()

# 使用示例
client = APIClient("https://api.example.com", "your-api-key")
users = client.get("users")
new_user = client.post("users", {"name": "张三", "email": "zhangsan@example.com"})`
        },
        {
            id: 'email-sender',
            title: '邮件发送',
            category: 'automation',
            description: '自动发送邮件通知',
            code: `import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders

def send_email(sender_email, sender_password, recipient_email, subject, body, attachment_path=None):
    # 创建邮件对象
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient_email
    msg['Subject'] = subject
    
    # 添加邮件正文
    msg.attach(MIMEText(body, 'plain', 'utf-8'))
    
    # 添加附件
    if attachment_path:
        with open(attachment_path, "rb") as attachment:
            part = MIMEBase('application', 'octet-stream')
            part.set_payload(attachment.read())
        
        encoders.encode_base64(part)
        part.add_header(
            'Content-Disposition',
            f'attachment; filename= {attachment_path.split("/")[-1]}'
        )
        msg.attach(part)
    
    # 发送邮件
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(sender_email, sender_password)
    text = msg.as_string()
    server.sendmail(sender_email, recipient_email, text)
    server.quit()

# 使用示例
send_email(
    "your_email@gmail.com",
    "your_password",
    "recipient@example.com",
    "测试邮件",
    "这是一封测试邮件",
    "report.pdf"
)`
        },
        {
            id: 'calculator',
            title: '简单计算器',
            category: 'basic',
            description: '基础的计算器程序',
            code: `def calculator():
    print("简单计算器")
    print("操作: +, -, *, /, quit")
    
    while True:
        try:
            expression = input("请输入表达式 (或输入 'quit' 退出): ")
            
            if expression.lower() == 'quit':
                print("再见！")
                break
            
            # 安全计算表达式
            allowed_chars = set('0123456789+-*/(). ')
            if not all(c in allowed_chars for c in expression):
                print("错误：包含非法字符")
                continue
            
            result = eval(expression)
            print(f"结果: {result}")
            
        except ZeroDivisionError:
            print("错误：不能除以零")
        except Exception as e:
            print(f"错误：{e}")

# 运行计算器
if __name__ == "__main__":
    calculator()`
        }
    ];
    
    let filteredExamples = examples;
    
    function renderExamples(examplesList) {
        examplesGrid.innerHTML = examplesList.map(example => `
            <div class="example-card" data-category="${example.category}">
                <div class="example-header">
                    <span class="example-title">${example.title}</span>
                    <div class="example-actions">
                        <button class="action-btn" onclick="toggleFavorite('${example.id}')" title="收藏">
                            <i class="fas fa-star ${favorites.includes(example.id) ? 'favorited' : ''}"></i>
                        </button>
                        <button class="action-btn" onclick="openNoteModal('${example.id}')" title="添加笔记">
                            <i class="fas fa-sticky-note"></i>
                        </button>
                    </div>
                </div>
                <div class="example-body">
                    <p>${example.description}</p>
                    <div class="code-block">
                        <button class="copy-btn" onclick="copyCode(this)">复制</button>
                        <pre>${example.code}</pre>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    renderExamples(filteredExamples);
    
    // 存储示例数据供其他函数使用
    window.examplesData = examples;
}

// 过滤示例
function filterExamples(category) {
    const examples = window.examplesData || [];
    const filteredExamples = category === 'all' ? examples : examples.filter(ex => ex.category === category);
    
    // 更新过滤按钮状态
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // 重新渲染示例
    const examplesGrid = document.getElementById('examples-grid');
    examplesGrid.innerHTML = filteredExamples.map(example => `
        <div class="example-card" data-category="${example.category}">
            <div class="example-header">
                <span class="example-title">${example.title}</span>
                <div class="example-actions">
                    <button class="action-btn" onclick="toggleFavorite('${example.id}')" title="收藏">
                        <i class="fas fa-star ${favorites.includes(example.id) ? 'favorited' : ''}"></i>
                    </button>
                    <button class="action-btn" onclick="openNoteModal('${example.id}')" title="添加笔记">
                        <i class="fas fa-sticky-note"></i>
                    </button>
                </div>
            </div>
            <div class="example-body">
                <p>${example.description}</p>
                <div class="code-block">
                    <button class="copy-btn" onclick="copyCode(this)">复制</button>
                    <pre>${example.code}</pre>
                </div>
            </div>
        </div>
    `).join('');
}

// 复制代码功能
function copyCode(button) {
    const codeBlock = button.nextElementSibling;
    const code = codeBlock.textContent;
    
    navigator.clipboard.writeText(code).then(() => {
        showCopyToast();
    }).catch(err => {
        console.error('复制失败:', err);
        // 降级方案
        const textArea = document.createElement('textarea');
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopyToast();
    });
}

// 显示复制提示
function showCopyToast() {
    const toast = document.getElementById('copy-toast');
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// 收藏功能
function toggleFavorite(exampleId) {
    const index = favorites.indexOf(exampleId);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(exampleId);
    }
    
    localStorage.setItem('pythonSiteFavorites', JSON.stringify(favorites));
    
    // 更新UI
    const starIcon = event.target.closest('.action-btn').querySelector('i');
    starIcon.classList.toggle('favorited');
    
    // 如果当前在收藏页面，刷新内容
    if (currentSection === 'favorites') {
        loadFavoritesContent();
    }
}

// 笔记功能
let currentNoteExampleId = null;

function openNoteModal(exampleId) {
    currentNoteExampleId = exampleId;
    const modal = document.getElementById('note-modal');
    const titleInput = document.getElementById('note-title');
    const contentTextarea = document.getElementById('note-content');
    
    // 查找现有笔记
    const existingNote = notes.find(note => note.exampleId === exampleId);
    if (existingNote) {
        titleInput.value = existingNote.title;
        contentTextarea.value = existingNote.content;
    } else {
        titleInput.value = '';
        contentTextarea.value = '';
    }
    
    modal.style.display = 'block';
}

function closeNoteModal() {
    const modal = document.getElementById('note-modal');
    modal.style.display = 'none';
    currentNoteExampleId = null;
}

function saveNote() {
    const title = document.getElementById('note-title').value.trim();
    const content = document.getElementById('note-content').value.trim();
    
    if (!title || !content) {
        alert('请填写标题和内容');
        return;
    }
    
    const noteIndex = notes.findIndex(note => note.exampleId === currentNoteExampleId);
    const noteData = {
        id: noteIndex > -1 ? notes[noteIndex].id : Date.now().toString(),
        exampleId: currentNoteExampleId,
        title: title,
        content: content,
        createdAt: noteIndex > -1 ? notes[noteIndex].createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    if (noteIndex > -1) {
        notes[noteIndex] = noteData;
    } else {
        notes.push(noteData);
    }
    
    localStorage.setItem('pythonSiteNotes', JSON.stringify(notes));
    closeNoteModal();
    
    // 如果当前在收藏页面，刷新内容
    if (currentSection === 'favorites') {
        loadFavoritesContent();
    }
}

// 加载收藏内容
function loadFavoritesContent() {
    showFavTab('bookmarks');
}

function showFavTab(tab) {
    const contentDiv = document.getElementById('favorites-content');
    
    // 更新标签状态
    document.querySelectorAll('.favorites-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    if (tab === 'bookmarks') {
        loadFavorites();
    } else if (tab === 'notes') {
        loadNotes();
    }
}

function loadFavorites() {
    const contentDiv = document.getElementById('favorites-content');
    const examples = window.examplesData || [];
    const favoriteExamples = examples.filter(ex => favorites.includes(ex.id));
    
    if (favoriteExamples.length === 0) {
        contentDiv.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--text-light);">
                <i class="fas fa-star" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.3;"></i>
                <p>还没有收藏任何代码示例</p>
                <button class="btn btn-primary" onclick="showSection('examples')">去浏览示例</button>
            </div>
        `;
        return;
    }
    
    contentDiv.innerHTML = `
        <h3>收藏的代码示例 (${favoriteExamples.length})</h3>
        <div class="examples-grid">
            ${favoriteExamples.map(example => `
                <div class="example-card">
                    <div class="example-header">
                        <span class="example-title">${example.title}</span>
                        <div class="example-actions">
                            <button class="action-btn" onclick="toggleFavorite('${example.id}')" title="取消收藏">
                                <i class="fas fa-star favorited"></i>
                            </button>
                        </div>
                    </div>
                    <div class="example-body">
                        <p>${example.description}</p>
                        <div class="code-block">
                            <button class="copy-btn" onclick="copyCode(this)">复制</button>
                            <pre>${example.code}</pre>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function loadNotes() {
    const contentDiv = document.getElementById('favorites-content');
    
    if (notes.length === 0) {
        contentDiv.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--text-light);">
                <i class="fas fa-sticky-note" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.3;"></i>
                <p>还没有任何笔记</p>
                <button class="btn btn-primary" onclick="showSection('examples')">去添加笔记</button>
            </div>
        `;
        return;
    }
    
    contentDiv.innerHTML = `
        <h3>我的笔记 (${notes.length})</h3>
        <div class="notes-list">
            ${notes.map(note => `
                <div class="note-card">
                    <div class="note-header">
                        <h4>${note.title}</h4>
                        <div class="note-actions">
                            <button class="action-btn" onclick="editNote('${note.id}')" title="编辑">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="action-btn" onclick="deleteNote('${note.id}')" title="删除">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div class="note-content">
                        <p>${note.content}</p>
                    </div>
                    <div class="note-footer">
                        <small>创建时间: ${new Date(note.createdAt).toLocaleString()}</small>
                        ${note.updatedAt !== note.createdAt ? `<small>更新时间: ${new Date(note.updatedAt).toLocaleString()}</small>` : ''}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function editNote(noteId) {
    const note = notes.find(n => n.id === noteId);
    if (note) {
        currentNoteExampleId = note.exampleId;
        openNoteModal(note.exampleId);
    }
}

function deleteNote(noteId) {
    if (confirm('确定要删除这条笔记吗？')) {
        const index = notes.findIndex(n => n.id === noteId);
        if (index > -1) {
            notes.splice(index, 1);
            localStorage.setItem('pythonSiteNotes', JSON.stringify(notes));
            loadNotes();
        }
    }
}

// 设置事件监听器
function setupEventListeners() {
    // 模态框点击外部关闭
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('note-modal');
        if (event.target === modal) {
            closeNoteModal();
        }
    });
    
    // ESC键关闭模态框
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeNoteModal();
        }
    });
}

// 加载内容
function loadContent() {
    // 初始化示例数据
    if (currentSection === 'examples') {
        loadExamplesContent();
    }
}

// PWA支持
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('Service Worker 注册成功:', registration);
            })
            .catch(error => {
                console.log('Service Worker 注册失败:', error);
            });
    }
}

// 添加CSS样式到页面
const additionalStyles = `
<style>
.favorited {
    color: #ffd43b !important;
}

.note-card {
    background: var(--bg-light);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 20px;
    margin-bottom: 20px;
}

.note-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.note-header h4 {
    margin: 0;
    color: var(--primary-color);
}

.note-actions {
    display: flex;
    gap: 10px;
}

.note-content {
    margin-bottom: 15px;
    line-height: 1.6;
}

.note-footer {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: var(--text-light);
}

.notes-list {
    max-height: 600px;
    overflow-y: auto;
}

@media (max-width: 768px) {
    .note-footer {
        flex-direction: column;
        gap: 5px;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);