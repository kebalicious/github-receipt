<template>
  <div class="bg-gray-100 dark:bg-gray-900 p-4 md:p-8 min-h-screen transition-colors duration-200">
    <!-- Desktop/Tablet Action Buttons -->
    <div class="hidden top-4 right-4 z-50 fixed sm:flex items-center gap-2">
      <button @click="showReceipt && downloadReceipt('png')"
        class="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 p-2 rounded-lg text-gray-700 dark:text-gray-300 transition-colors"
        :class="{ 'opacity-50 cursor-not-allowed': !showReceipt }"
        title="Download Receipt"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </button>
      <button @click="showReceipt && shareReceipt()"
        class="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 p-2 rounded-lg text-gray-700 dark:text-gray-300 transition-colors"
        :class="{ 'opacity-50 cursor-not-allowed': !showReceipt }"
        title="Share Receipt"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      </button>
      <DarkModeToggle />
    </div>

    <!-- Mobile Action Buttons -->
    <div class="sm:hidden right-4 bottom-4 left-4 z-50 fixed flex justify-center">
      <div class="flex gap-2 bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-sm p-2 rounded-lg">
        <template v-if="showReceipt">
          <button @click="downloadReceipt('png')"
            class="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 p-2 rounded-lg text-gray-700 dark:text-gray-300 transition-colors"
            title="Download Receipt"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
          <button @click="shareReceipt()"
            class="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 p-2 rounded-lg text-gray-700 dark:text-gray-300 transition-colors"
            title="Share Receipt"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </template>
        <DarkModeToggle />
      </div>
    </div>

    <div class="mx-auto max-w-lg">
      <!-- Username Input Section -->
      <div class="mb-8 p-4 md:p-6 rounded-lg">
        <div class="mb-6">
          <h1 class="mb-2 font-bold text-gray-800 dark:text-white text-2xl md:text-3xl text-center">
            GitHub Receipt Generator
          </h1>
          <h4 class="text-gray-600 dark:text-gray-400 text-center">
            Generate a receipt for your GitHub contributions
          </h4>
        </div>
        
        <!-- Show input field only when not showing receipt or when generating new -->
        <div v-if="!showReceipt" class="flex sm:flex-row flex-col gap-3">
          <div class="flex flex-1 w-full">
            <div class="flex items-center bg-white dark:bg-gray-700 px-4 py-2 border border-gray-300 dark:border-gray-600 border-r-0 rounded-l-lg text-gray-900 dark:text-white">
              @
            </div>
            <input 
              v-model="username" 
              type="text" 
              placeholder="Enter GitHub username"
              class="flex-1 bg-white dark:bg-gray-700 px-4 py-2 border border-gray-300 dark:border-gray-600 focus:border-transparent rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-0 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              @keyup.enter="generateReceipt"
            />
          </div>
          <button 
            @click="generateReceipt"
            :disabled="loading"
            class="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 w-full sm:w-auto text-white transition-colors disabled:cursor-not-allowed"
          >
            {{ loading ? 'Generating...' : 'Generate' }}
          </button>
        </div>

        <!-- Show Generate Other button when receipt is shown -->
        <div v-else class="flex justify-center">
          <button 
            @click="generateOther"
            class="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 w-full sm:w-auto text-white transition-colors"
          >
            Generate Other
          </button>
        </div>

        <p v-if="error" class="mt-4 text-red-500 dark:text-red-400">{{ error }}</p>
      </div>

      <!-- Receipt Display Section -->
      <div v-if="loading" class="py-12 text-center">
        <div class="mx-auto border-b-2 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-400">Fetching GitHub stats...</p>
      </div>

      <GithubReceipt 
        v-if="showReceipt && !loading" 
        :username="username"
        :stats="githubStats"
        @download="downloadReceipt"
        @share="shareReceipt"
      >
        <!-- Pass dark mode toggle to floating bar on mobile -->
        <template #dark-mode-toggle>
          <div class="sm:hidden">
            <DarkModeToggle />
          </div>
        </template>
      </GithubReceipt>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { fetchGithubStats } from '~/utils/github'
import html2canvas from 'html2canvas'
import DarkModeToggle from '~/components/DarkModeToggle.vue'

const username = ref('')
const loading = ref(false)
const showReceipt = ref(false)
const githubStats = ref(null)
const error = ref('')

async function generateReceipt() {
  if (!username.value.trim()) {
    error.value = 'Please enter a GitHub username'
    return
  }

  error.value = ''
  loading.value = true
  showReceipt.value = false

  try {
    const stats = await fetchGithubStats(username.value)
    githubStats.value = stats
    showReceipt.value = true
  } catch (err) {
    error.value = err.message === 'User not found'
      ? 'GitHub user not found'
      : 'Failed to fetch GitHub stats. Please try again.'
    console.error('Failed to fetch GitHub stats:', err)
  } finally {
    loading.value = false
  }
}

function generateOther() {
  showReceipt.value = false
  username.value = ''
  githubStats.value = null
  error.value = ''
}

async function downloadReceipt(format) {
  const receipt = document.querySelector('#github-receipt')
  if (!receipt) return

  try {
    const canvas = await html2canvas(receipt, {
      backgroundColor: '#ffffff',
      removeContainer: true,
      scale: 2, // Higher quality
      logging: false,
      ignoreElements: (element) => {
        return element.id === 'receipt-actions'
      }
    })
    const dataUrl = canvas.toDataURL('image/png')

    const link = document.createElement('a')
    link.download = `github-receipt-${username.value}.png`
    link.href = dataUrl
    link.click()
  } catch (err) {
    console.error('Failed to download receipt:', err)
    error.value = 'Failed to download receipt. Please try again.'
  }
}

async function shareReceipt() {
  if (!navigator.share) {
    error.value = 'Sharing is not supported on your device'
    return
  }

  try {
    await navigator.share({
      title: 'GitHub Receipt',
      text: `Check out ${username.value}'s GitHub stats!`,
      url: window.location.href
    })
  } catch (err) {
    if (err.name !== 'AbortError') {
      error.value = 'Failed to share receipt'
      console.error('Failed to share:', err)
    }
  }
}
</script>
