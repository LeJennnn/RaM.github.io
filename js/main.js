// ========== 文章列表 ==========
const articleList = [
    { id: "post1", title: "Django Vue AdminX 框架开发实战", date: "2026-03-22", tag: "Django", excerpt: "一套完整的企业级后台管理系统框架，基于 Django 5.2 和 Vue 3 开发，包含 RBAC 权限控制、代码生成器、操作日志等核心功能。", tags: "#Python #Django #Vue" },
    { id: "post2", title: "从零搭建极简校园社区网站", date: "2026-03-20", tag: "前端", excerpt: "分享如何用 Vue 3 和 Django 快速搭建一个校园社区网站，包含首页帖子流、二手市场、开发接单、社团活动等模块。", tags: "#Vue #Django #社区" },
    { id: "post3", title: "AI辅助开发：我的工作流实践", date: "2026-03-18", tag: "AI", excerpt: "分享我如何用 AI（Ollama + Qwen）辅助日常开发工作，从代码生成、调试辅助到文档撰写，效率提升3倍。", tags: "#AI #效率 #工具" }
];

// ========== 友情链接 ==========
const friendsList = [
    {
        title: "Witherwithwinter's Blog",
        imgurl: "https://witherwithwinter.github.io/favicon.ico",
        desc: "技术随笔、算法竞赛、生活感悟",
        siteurl: "https://witherwithwinter.github.io/",
        tags: ["技术", "算法", "生活"]
    },
    {
        title: "张三的技术笔记",
        imgurl: "https://example.com/avatar.jpg",
        desc: "前端开发、React、Vue 源码解析",
        siteurl: "https://zhangsan.github.io/",
        tags: ["前端", "React", "Vue"]
    },
    {
        title: "李四的编程世界",
        imgurl: "https://example.com/avatar2.jpg",
        desc: "Python、Django、后端架构",
        siteurl: "https://lisi.github.io/",
        tags: ["Python", "Django", "后端"]
    }
];

// ========== 更新统计 ==========
function updateStats() {
    const postCountEl = document.getElementById('postCount');
    if (postCountEl) postCountEl.innerText = articleList.length;
    const friendCountEl = document.getElementById('friendCount');
    if (friendCountEl) friendCountEl.innerText = friendsList.length;
}

// ========== 渲染首页 ==========
function renderHomePage() {
    const container = document.getElementById('homePage');
    if (!container) return;
    
    container.innerHTML = articleList.map(article => `
        <div class="post-card">
            <span class="post-tag"># ${article.tag}</span>
            <h2 class="post-title"><a href="#" onclick="loadPost('${article.id}'); return false;">${article.title}</a></h2>
            <div class="post-meta">📅 ${article.date} · 🕒 约 5分钟阅读</div>
            <div class="post-excerpt">${article.excerpt}</div>
            <div class="post-footer">
                <span>🏷️ ${article.tags}</span>
                <a href="#" onclick="loadPost('${article.id}'); return false;">阅读全文 →</a>
            </div>
        </div>
    `).join('');
}

// ========== 加载文章 ==========
async function loadPost(postId) {
    const postDetail = document.getElementById('postDetail');
    if (!postDetail) return;
    
    // 显示加载中
    postDetail.innerHTML = '<div class="loading">加载中...</div>';
    postDetail.style.display = 'block';
    
    // 隐藏其他页面
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('archivePage').style.display = 'none';
    document.getElementById('friendsPage').style.display = 'none';
    document.getElementById('aboutPage').style.display = 'none';
    
    try {
        const response = await fetch(`posts/${postId}.html`);
        if (!response.ok) throw new Error('文章不存在');
        const html = await response.text();
        postDetail.innerHTML = `
            <div class="post-card post-detail">
                ${html}
                <div class="post-footer" style="margin-top: 24px;">
                    <a href="#" onclick="showPage('home'); return false;" class="back-link">← 返回首页</a>
                </div>
            </div>
        `;
    } catch (error) {
        postDetail.innerHTML = `
            <div class="post-card">
                <p style="color: #ff6b6b;">文章加载失败，请稍后再试。</p>
                <div class="post-footer" style="margin-top: 24px;">
                    <a href="#" onclick="showPage('home'); return false;" class="back-link">← 返回首页</a>
                </div>
            </div>
        `;
    }
}

// ========== 渲染归档页 ==========
function renderArchive() {
    const container = document.getElementById('archivePage');
    if (!container) return;
    
    const grouped = {};
    articleList.forEach(article => {
        const year = article.date.slice(0, 4);
        const month = article.date.slice(5, 7);
        if (!grouped[year]) grouped[year] = {};
        if (!grouped[year][month]) grouped[year][month] = [];
        grouped[year][month].push(article);
    });
    
    let html = '<div class="archive-list">';
    for (const year of Object.keys(grouped).sort().reverse()) {
        html += `<div class="archive-year">${year}年</div>`;
        for (const month of Object.keys(grouped[year]).sort().reverse()) {
            html += `<div class="archive-month">
                <div class="archive-month-title">${month}月</div>
                <ul class="archive-items">`;
            for (const article of grouped[year][month]) {
                html += `<li><a href="#" onclick="loadPost('${article.id}'); return false;">${article.title}</a><span class="archive-date">${article.date}</span></li>`;
            }
            html += `</ul></div>`;
        }
    }
    html += '</div>';
    container.innerHTML = html;
}

// ========== 渲染友链页 ==========
function renderFriends() {
    const container = document.getElementById('friendsPage');
    if (!container) return;
    
    const html = `
        <div class="friends-section">
            <h2 class="friends-title">🤝 友情链接</h2>
            <p class="friends-subtitle">我的朋友们的博客，欢迎互链</p>
            <div class="friends-grid">
                ${friendsList.map(friend => `
                    <a href="${friend.siteurl}" target="_blank" class="friend-card" rel="noopener noreferrer">
                        <div class="friend-avatar">
                            <img src="${friend.imgurl}" alt="${friend.title}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%23D9B48B\'%3E%3Cpath d=\'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z\'/%3E%3C/svg%3E'">
                        </div>
                        <div class="friend-info">
                            <h3 class="friend-name">${friend.title}</h3>
                            <p class="friend-desc">${friend.desc}</p>
                            <div class="friend-tags">
                                ${friend.tags.map(tag => `<span class="friend-tag">#${tag}</span>`).join('')}
                            </div>
                        </div>
                    </a>
                `).join('')}
            </div>
            <div class="friends-footer">
                <p>📝 申请友链请邮件联系：ram@campus.com</p>
            </div>
        </div>
    `;
    container.innerHTML = html;
}

// ========== 渲染关于页 ==========
function renderAbout() {
    const container = document.getElementById('aboutPage');
    if (!container) return;
    
    container.innerHTML = `
        <div class="about-card">
            <div class="about-avatar">R</div>
            <h1>👤 关于我</h1>
            <p>我是 RaM，一名在校大学生，软件工程专业。</p>
            <p>热爱编程，喜欢折腾新技术，目前专注于 Django + Vue 全栈开发，也在尝试 AI 辅助开发工作流。</p>
            <h2>技术栈</h2>
            <ul>
                <li><strong>语言</strong>：Python / JavaScript / PHP / C++ / Rust</li>
                <li><strong>后端</strong>：Django / FastAPI</li>
                <li><strong>前端</strong>：Vue 3 / Vite / Tailwind</li>
                <li><strong>数据库</strong>：PostgreSQL / MySQL / SQLite</li>
                <li><strong>部署</strong>：Docker / Nginx / GitHub Pages</li>
                <li><strong>操作系统</strong>：Arch / Kali / RedHat / Debian</li>
            </ul>
            <h2>联系方式</h2>
            <p>📧 邮箱：1963561552@qq.com</p>
            <p>🐙 GitHub：<a href="https://github.com/LeJennnn" target="_blank">github.com/LeJennnn</a></p>
            <h2>关于本站</h2>
            <p>本站使用纯 HTML/CSS/JS 构建，主题深色，代码开源。</p>
        </div>
    `;
}

// ========== 页面切换 ==========
function showPage(page) {
    // 隐藏所有页面容器
    const containers = ['homePage', 'postDetail', 'archivePage', 'friendsPage', 'aboutPage'];
    containers.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    
    // 显示目标页面
    if (page === 'home') {
        const homePage = document.getElementById('homePage');
        if (homePage) homePage.style.display = 'block';
    } else if (page === 'archive') {
        renderArchive();
        const archivePage = document.getElementById('archivePage');
        if (archivePage) archivePage.style.display = 'block';
    } else if (page === 'friends') {
        renderFriends();
        const friendsPage = document.getElementById('friendsPage');
        if (friendsPage) friendsPage.style.display = 'block';
    } else if (page === 'about') {
        renderAbout();
        const aboutPage = document.getElementById('aboutPage');
        if (aboutPage) aboutPage.style.display = 'block';
    }
}

// ========== 初始化 ==========
function init() {
    updateStats();
    renderHomePage();
    showPage('home');
}

// 页面加载完成后执行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}