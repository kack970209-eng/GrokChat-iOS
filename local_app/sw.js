// Service Worker 版本
const CACHE_NAME = 'python-learning-v1.0.0';
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// 安装事件 - 缓存资源
self.addEventListener('install', event => {
  console.log('Service Worker: 安装中...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: 缓存文件');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: 安装完成');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: 安装失败', error);
      })
  );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', event => {
  console.log('Service Worker: 激活中...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: 删除旧缓存', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: 激活完成');
      return self.clients.claim();
    })
  );
});

// 拦截网络请求
self.addEventListener('fetch', event => {
  // 只处理GET请求
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果缓存中有，直接返回
        if (response) {
          console.log('Service Worker: 从缓存返回', event.request.url);
          return response;
        }

        // 否则从网络获取
        console.log('Service Worker: 从网络获取', event.request.url);
        return fetch(event.request).then(response => {
          // 检查响应是否有效
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // 克隆响应，因为响应流只能使用一次
          const responseToCache = response.clone();

          // 将新资源添加到缓存
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch(error => {
          console.error('Service Worker: 网络请求失败', error);
          
          // 如果是HTML请求且网络失败，返回离线页面
          if (event.request.destination === 'document') {
            return caches.match('./index.html');
          }
          
          // 对于其他资源，可以返回默认的离线响应
          return new Response('离线状态下无法加载此资源', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          });
        });
      })
  );
});

// 处理消息事件
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// 后台同步事件（如果支持）
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    console.log('Service Worker: 后台同步');
    event.waitUntil(doBackgroundSync());
  }
});

// 推送通知事件（如果需要）
self.addEventListener('push', event => {
  console.log('Service Worker: 收到推送消息');
  
  const options = {
    body: event.data ? event.data.text() : '您有新的Python学习内容！',
    icon: './icon-192.png',
    badge: './icon-72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: '查看内容',
        icon: './icon-96.png'
      },
      {
        action: 'close',
        title: '关闭',
        icon: './icon-96.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Python学习宝典', options)
  );
});

// 通知点击事件
self.addEventListener('notificationclick', event => {
  console.log('Service Worker: 通知被点击');
  event.notification.close();

  if (event.action === 'explore') {
    // 打开应用
    event.waitUntil(
      clients.openWindow('./')
    );
  } else if (event.action === 'close') {
    // 关闭通知
    event.notification.close();
  } else {
    // 默认行为：打开应用
    event.waitUntil(
      clients.openWindow('./')
    );
  }
});

// 后台同步函数
async function doBackgroundSync() {
  try {
    // 这里可以执行后台同步任务
    // 比如同步用户的收藏和笔记到服务器
    console.log('Service Worker: 执行后台同步任务');
    
    // 示例：检查是否有待同步的数据
    const favorites = localStorage.getItem('pythonSiteFavorites');
    const notes = localStorage.getItem('pythonSiteNotes');
    
    if (favorites || notes) {
      // 这里可以发送到服务器
      console.log('Service Worker: 发现待同步数据');
    }
    
    return Promise.resolve();
  } catch (error) {
    console.error('Service Worker: 后台同步失败', error);
    return Promise.reject(error);
  }
}

// 缓存策略：网络优先，缓存备用
function networkFirst(request) {
  return fetch(request)
    .then(response => {
      const responseClone = response.clone();
      caches.open(CACHE_NAME).then(cache => {
        cache.put(request, responseClone);
      });
      return response;
    })
    .catch(() => {
      return caches.match(request);
    });
}

// 缓存策略：缓存优先，网络备用
function cacheFirst(request) {
  return caches.match(request)
    .then(response => {
      if (response) {
        return response;
      }
      return fetch(request).then(response => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, responseClone);
        });
        return response;
      });
    });
}

// 错误处理
self.addEventListener('error', event => {
  console.error('Service Worker: 发生错误', event.error);
});

self.addEventListener('unhandledrejection', event => {
  console.error('Service Worker: 未处理的Promise拒绝', event.reason);
});

console.log('Service Worker: 脚本加载完成');