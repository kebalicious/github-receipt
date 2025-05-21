<template>
  <div class="relative mx-auto pb-24 sm:pb-0 max-w-md">
    <!-- The actual receipt that will be captured for download -->
    <div ref="receiptRef" id="github-receipt" class="relative">
      <!-- Decorative top edge -->
      <div class="-top-4 right-0 left-0 absolute overflow-hidden text-gray-300 text-2xl text-center leading-none select-none">
      </div>

      <!-- Main Receipt -->
      <div class="relative bg-white shadow-lg p-8 rounded-lg font-mono">
        <!-- Paper texture overlay -->
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGQ9Ik0wIDBoNHY0SDB6IiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz48L3N2Zz4=')] opacity-50 rounded-lg pointer-events-none"></div>

        <!-- Receipt Header -->
        <div class="space-y-0 pb-4 border-gray-300 border-b border-dashed text-center">
          <h2 class="font-bold text-xl">GITHUB RECEIPT</h2>
          <p class="mt-2">{{ formattedDate }}</p>
          <p>Order No. #{{ orderNumber }}</p>
        </div>

        <!-- Order Info -->
        <div class="py-4 border-gray-300 border-b border-dashed">
          <p class="mt-2">Customer name:</p>
          <p>{{ stats.displayName }}</p>
          <p class="text-gray-600">@{{ username }}</p>
        </div>

        <!-- Main Stats -->
        <div class="py-4 border-gray-300 border-b border-dashed">
          <div class="flex justify-between">
            <span>Repositories</span>
            <span>{{ stats.totalRepos }}</span>
          </div>
          <div class="flex justify-between">
            <span>Stars Earned</span>
            <span>{{ stats.totalStars }}</span>
          </div>
          <div class="flex justify-between">
            <span>Repo Forks</span>
            <span>{{ stats.totalForks }}</span>
          </div>
        </div>

        <!-- Followers Stats -->
        <div class="py-4 border-gray-300 border-b border-dashed">
          <div class="flex justify-between">
            <span>Followers</span>
            <span>{{ stats.followers }}</span>
          </div>
          <div class="flex justify-between">
            <span>Following</span>
            <span>{{ stats.following }}</span>
          </div>
        </div>

        <!-- Languages -->
        <div class="py-4 border-gray-300 border-b border-dashed">
          <p>Top Languages</p>
          <p>{{ stats.topLanguages.join(', ') }}</p>
        </div>

        <!-- Activity -->
        <div class="py-4 border-gray-300 border-b border-dashed">
          <div class="flex justify-between">
            <span>Most Active Day</span>
            <span>{{ stats.mostActiveDay }}</span>
          </div>
          <div class="flex justify-between">
            <span>Commits in 30 Days</span>
            <span>{{ stats.recentCommits }}</span>
          </div>
        </div>

        <!-- Contribution Score -->
        <div class="py-4 border-gray-300 border-b border-dashed">
          <div class="flex justify-between">
            <span>Contribution Score</span>
            <span>{{ stats.contributionScore }}</span>
          </div>
        </div>

        <!-- Server Info -->
        <div class="py-4 border-gray-300 border-b border-dashed text-sm">
          <p>Served by: {{ serverName }}</p>
          <p class="text-gray-600">{{ currentDateTime }}</p>
        </div>

        <!-- Tax Info -->
        <div class="py-4 border-gray-300 border-b border-dashed text-center italic">
          <p class="text-gray-600">Save for tax claim relief!</p>
        </div>

        <!-- Payment Info -->
        <div class="py-4 border-gray-300 border-b border-dashed">
          <p>Card #: **** **** **** {{ new Date().getFullYear() }}</p>
          <p>Auth code: {{ authCode }}</p>
          <p>Cardholder: {{ username.toUpperCase() }}</p>
        </div>

        <!-- Thank You -->
        <div class="py-4 text-center">
          <p>THANK YOU FOR CODING.</p>
          <p>EAT. CODE. SLEEP. REPEAT.</p>
        </div>

        <!-- Barcode -->
        <div class="pt-4 text-center">
          <div class="w-full">
            <svg ref="barcodeRef" id="barcode" class="w-full"></svg>
            <p class="mt-2 text-gray-600 text-xs">github.com/{{ username }}</p>
          </div>
        </div>
      </div>

      <!-- Decorative bottom edge -->
      <div class="right-0 -bottom-4 left-0 absolute overflow-hidden text-gray-300 text-2xl text-center leading-none select-none">
      </div>
    </div>

    <!-- Mobile Action Buttons -->
    <div class="sm:hidden right-0 bottom-16 left-0 fixed flex justify-center items-center gap-2 bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-sm p-4">
      <button @click="$emit('download', 'png')"
        class="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 p-2 rounded-lg text-gray-700 dark:text-gray-300 transition-colors"
        title="Download Receipt"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </button>
      <button @click="$emit('share')"
        class="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 p-2 rounded-lg text-gray-700 dark:text-gray-300 transition-colors"
        title="Share Receipt"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import JsBarcode from 'jsbarcode'

const props = defineProps({
  username: {
    type: String,
    required: true
  },
  stats: {
    type: Object,
    required: true
  }
})

const receiptRef = ref(null)
const barcodeRef = ref(null)
const isDarkMode = ref(false)

// Generate random server name
const serverNames = ['HAL 9000', 'JARVIS', 'GLaDOS', 'TARS', 'CASE', 'Mother', 'Deep Thought']
const serverName = serverNames[Math.floor(Math.random() * serverNames.length)]

// Format current date
const formattedDate = computed(() => {
  const date = new Date()
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
})

// Current date time
const currentDateTime = computed(() => {
  const date = new Date()
  return `${date.toLocaleTimeString('en-US')} ${date.toISOString().split('T')[0]}`
})

// Generate random order number (1000-9999)
const orderNumber = Math.floor(Math.random() * 9000) + 1000

// Generate random auth code (8 digits)
const authCode = Math.random().toString().slice(2, 10)

function generateBarcode() {
  if (barcodeRef.value) {
    JsBarcode(barcodeRef.value, `github.com/${props.username}`, {
      format: "CODE128",
      width: 2,
      height: 50,
      displayValue: false,
      lineColor: "#000000", // Always black for better visibility
      background: "#ffffff", // Always white background
      margin: 10
    })
  }
}

onMounted(() => {
  // Check dark mode
  isDarkMode.value = document.documentElement.classList.contains('dark')
  
  // Generate initial barcode
  generateBarcode()

  // Watch for dark mode changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        isDarkMode.value = document.documentElement.classList.contains('dark')
      }
    })
  })

  observer.observe(document.documentElement, {
    attributes: true
  })
})

defineEmits(['download', 'share'])
</script>

<style scoped>
.font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, Liberation Mono, monospace;
}

/* Paper texture and shadow effects */
.shadow-lg {
  box-shadow: 
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05),
    0 0 0 1px rgba(0, 0, 0, 0.05);
}
</style> 