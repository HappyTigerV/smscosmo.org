<template>
  <div>
    <Title>关于我们</Title>
    <Hero />
    <div class="flex relative px-4">
      <!-- 可收起的左侧导航栏 -->
      <div
        class="fixed left-0 sm:left-4 top-1/2 -translate-y-1/2 z-50 transition-all duration-300"
        :class="isNavOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <div class="nav-sidebar bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-lg shadow-xl border border-blue-200/30 dark:border-gray-700/30 p-5 min-w-[200px] sm:min-w-[220px] max-h-[80vh] overflow-y-auto">
          <div class="flex items-center justify-between mb-5 pb-4 border-b border-blue-200/20 dark:border-gray-700/20">
            <h3 class="text-lg sm:text-xl font-semibold font-misans text-blue-600 dark:text-blue-400">
              关于组织
            </h3>
            <button
              class="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors p-1 rounded-md hover:bg-blue-50/50 dark:hover:bg-gray-700/50"
              @click="isNavOpen = false"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav class="space-y-1.5">
            <a
              v-for="(item, index) in navigationItems"
              :key="index" :href="`#section-${index + 1}`"
              class="nav-item block px-4 py-2.5 rounded-lg text-sm font-medium font-misans text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/60 dark:hover:bg-gray-700/60 transition-all duration-200 cursor-pointer border border-transparent hover:border-blue-200/50 dark:hover:border-gray-600/50"
              @click="scrollToSection(`section-${index + 1}`, $event)"
            >
              {{ item }}
            </a>
          </nav>
        </div>
      </div>

      <!-- 展开按钮 -->
      <button
        v-if="!isNavOpen"
        class="nav-toggle-btn fixed left-0 sm:left-4 top-1/2 -translate-y-1/2 z-40 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-r-lg p-2.5 sm:p-3 shadow-lg transition-all duration-300 hover:shadow-xl"
        @click="isNavOpen = true"
      >
        <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- 内容区域 -->
      <div class="w-full max-w-4xl mx-auto py-10">
        <ul class="space-y-6">
          <!-- 过往项目介绍 -->
          <li id="section-1" class="scroll-mt-32">
            <div class="space-y-6">
              <h2 class="text-2xl font-bold mb-6 font-misans text-gray-800 dark:text-gray-200">
                过往项目介绍
              </h2>
              <div v-if="!projects || projects.length === 0" class="text-center text-gray-500 py-8">
                暂无项目介绍
              </div>
              <div
                v-for="(project, index) in projects"
                v-else
                :key="`project-${index}`"
                class="project-card bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-xl shadow-lg border border-blue-200/30 dark:border-gray-700/30 p-8 font-misans transition-all duration-300 hover:shadow-xl hover:border-blue-300/50 dark:hover:border-gray-600/50"
              >
                <ContentRenderer :value="project" />
              </div>
            </div>
          </li>

          <!-- 各届人员介绍 -->
          <li id="section-2" class="scroll-mt-32">
            <h2 class="text-2xl font-bold mb-6 font-misans text-gray-800 dark:text-gray-200">
              各届人员介绍
            </h2>
            <div class="space-y-6">
              <div v-if="!members || members.length === 0" class="text-center text-gray-500 py-8">
                暂无人员介绍
              </div>
              <div
                v-for="(member, index) in members"
                v-else :key="`member-${index}`"
                class="member-card bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-xl shadow-lg border border-blue-200/30 dark:border-gray-700/30 p-8 font-misans transition-all duration-300 hover:shadow-xl hover:border-blue-300/50 dark:hover:border-gray-600/50"
              >
                <ContentRenderer :value="member" />
              </div>
            </div>
          </li>

          <!-- 鸣谢 -->
          <li id="section-3" class="scroll-mt-32">
            <h2 class="text-2xl font-bold mb-6 font-misans text-gray-800 dark:text-gray-200">
              鸣谢
            </h2>
            <div class="acknowledgement-card bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-xl shadow-lg border border-blue-200/30 dark:border-gray-700/30 p-8 font-misans transition-all duration-300 hover:shadow-xl hover:border-blue-300/50 dark:hover:border-gray-600/50">
              <p class="text-gray-600 dark:text-gray-300">
                鸣谢内容完善中...
              </p>
            </div>
          </li>
        </ul>
      </div>

      <!-- 回到顶部按钮 -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 scale-0"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-0"
      >
        <button
          v-if="showBackToTop"
          class="back-to-top-btn fixed bottom-20 right-10 z-50 bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-full p-3 shadow-lg border border-blue-200/30 dark:border-gray-700/30 text-blue-600 dark:text-blue-400 hover:bg-blue-50/40 dark:hover:bg-gray-700/40 hover:border-blue-300/50 dark:hover:border-gray-600/50 transition-all duration-300 hover:shadow-xl hover:scale-110"
          aria-label="回到顶部" @click="scrollToTop"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
const isNavOpen = ref(false);
const showBackToTop = ref(false);
const navigationItems = ['过往项目介绍', '各届人员介绍', '鸣谢'];

const [{ data: projects }, { data: members }] = await Promise.all([
  useAsyncData('projects-data', () => queryCollection('projects').all()),
  useAsyncData('members-data', () => queryCollection('members').all()),
]);

// 监听滚动，控制回到顶部按钮显示
onMounted(() => {
  const handleScroll = () => {
    // 检查滚动容器（.grid-main）和 window
    const scrollContainer = document.querySelector('.grid-main');
    let scrollTop = 0;

    if (scrollContainer) {
      scrollTop = scrollContainer.scrollTop;
    } else {
      scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }

    showBackToTop.value = scrollTop > 300;
  };

  // 初始检查
  handleScroll();

  // 监听滚动事件 - 同时监听容器和 window
  const scrollContainer = document.querySelector('.grid-main');
  if (scrollContainer) {
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
  }
  window.addEventListener('scroll', handleScroll, { passive: true });

  // 清理函数
  return () => {
    if (scrollContainer) {
      scrollContainer.removeEventListener('scroll', handleScroll);
    }
    window.removeEventListener('scroll', handleScroll);
  };
});

// 滚动到顶部
function scrollToTop() {
  const scrollContainer = document.querySelector('.grid-main');
  if (scrollContainer) {
    scrollContainer.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  } else {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}

// 滚动到指定位置
function scrollToSection(id: string, event: Event) {
  event.preventDefault();

  // 使用 nextTick 确保 DOM 已更新
  nextTick(() => {
    // 使用双重 setTimeout 确保元素已完全渲染
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        // 使用 scrollIntoView 方法，配合 CSS scroll-margin-top
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      } else {
        // 如果找不到元素，尝试直接使用 hash 跳转
        window.location.hash = id;
        // 然后再次尝试滚动
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }, 200);
      }
    }, 100);
  });
}
</script>

<!-- cosmo-only-tailwind-disable -->
<style scoped>
.nav-sidebar {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%);
}

.dark .nav-sidebar {
  background: linear-gradient(135deg, rgba(31, 41, 55, 0.25) 0%, rgba(31, 41, 55, 0.15) 100%);
}

.nav-item {
  position: relative;
}

.nav-item:hover {
  transform: translateX(2px);
}

.nav-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 0;
  background: linear-gradient(to bottom, #0961B9, #048BFF);
  border-radius: 0 2px 2px 0;
  transition: height 0.2s ease;
}

.nav-item:hover::before {
  height: 60%;
}

.nav-toggle-btn {
  backdrop-filter: blur(10px);
}

.project-card,
.member-card,
.acknowledgement-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%);
  position: relative;
  overflow: hidden;
}

.dark .project-card,
.dark .member-card,
.dark .acknowledgement-card {
  background: linear-gradient(135deg, rgba(31, 41, 55, 0.25) 0%, rgba(31, 41, 55, 0.15) 100%);
}

.project-card::before,
.member-card::before,
.acknowledgement-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(to right, #0961B9, #0679E1, #048BFF, #99C2FF);
  opacity: 0.6;
}

.project-card:hover::before,
.member-card:hover::before,
.acknowledgement-card:hover::before {
  opacity: 1;
}

/* 优化内容渲染器的样式 */
.project-card :deep(h1),
.member-card :deep(h1),
.acknowledgement-card :deep(h1) {
  color: #0961B9;
  font-weight: 700;
  margin-bottom: 1rem;
  font-size: 1.875rem;
}

.project-card :deep(h2),
.member-card :deep(h2),
.acknowledgement-card :deep(h2) {
  color: #0679E1;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-size: 1.5rem;
}

.project-card :deep(h3),
.member-card :deep(h3),
.acknowledgement-card :deep(h3) {
  color: #048BFF;
  font-weight: 600;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.project-card :deep(p),
.member-card :deep(p),
.acknowledgement-card :deep(p) {
  color: #374151;
  line-height: 1.75;
  margin-bottom: 1rem;
}

.dark .project-card :deep(p),
.dark .member-card :deep(p),
.dark .acknowledgement-card :deep(p) {
  color: #e5e7eb;
}

.project-card :deep(strong),
.member-card :deep(strong),
.acknowledgement-card :deep(strong) {
  color: #0961B9;
  font-weight: 600;
}

.dark .project-card :deep(strong),
.dark .member-card :deep(strong),
.dark .acknowledgement-card :deep(strong) {
  color: #60a5fa;
}

.project-card :deep(ul),
.member-card :deep(ul),
.acknowledgement-card :deep(ul) {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.project-card :deep(li),
.member-card :deep(li),
.acknowledgement-card :deep(li) {
  margin-bottom: 0.5rem;
  color: #374151;
  line-height: 1.75;
}

.dark .project-card :deep(li),
.dark .member-card :deep(li),
.dark .acknowledgement-card :deep(li) {
  color: #e5e7eb;
}
</style>
