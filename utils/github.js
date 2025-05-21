/**
 * @typedef {Object} GithubStats
 * @property {string} displayName
 * @property {number} totalRepos
 * @property {number} totalStars
 * @property {number} totalForks
 * @property {number} followers
 * @property {number} following
 * @property {string[]} topLanguages
 * @property {string} mostActiveDay
 * @property {number} recentCommits
 * @property {number} contributionScore
 */

/**
 * Fetch GitHub stats for a user
 * @param {string} username - GitHub username
 * @returns {Promise<GithubStats>}
 */
export async function fetchGithubStats(username) {
  try {
    // Fetch basic user info
    const userResponse = await fetch(`https://api.github.com/users/${username}`);
    const userData = await userResponse.json();

    if (userResponse.status === 404) {
      throw new Error('User not found');
    }

    // Fetch repositories
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    const reposData = await reposResponse.json();

    // Calculate total stars and forks
    const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = reposData.reduce((sum, repo) => sum + repo.forks_count, 0);

    // Get languages
    const languages = new Set();
    reposData.forEach((repo) => {
      if (repo.language) {
        languages.add(repo.language);
      }
    });

    // Fetch recent commits (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    // Note: This is a simplified version. GitHub's API has rate limits and doesn't directly provide commit counts
    // For a production app, you'd want to implement proper pagination and rate limit handling
    const eventsResponse = await fetch(`https://api.github.com/users/${username}/events?per_page=100`);
    const eventsData = await eventsResponse.json();
    
    const recentCommits = eventsData.filter(event => 
      event.type === 'PushEvent' && new Date(event.created_at) > thirtyDaysAgo
    ).length;

    // Calculate most active day (simplified version)
    const dayCount = {};
    eventsData.forEach(event => {
      const day = new Date(event.created_at).toLocaleDateString('en-US', { weekday: 'long' });
      dayCount[day] = (dayCount[day] || 0) + 1;
    });

    const mostActiveDay = Object.entries(dayCount)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || 'Not enough data';

    // Calculate contribution score (simplified version)
    const contributionScore = totalStars * 2 + totalForks * 3 + recentCommits + userData.followers;

    return {
      displayName: userData.name || username,
      totalRepos: userData.public_repos,
      totalStars,
      totalForks,
      followers: userData.followers,
      following: userData.following,
      topLanguages: Array.from(languages).slice(0, 5),
      mostActiveDay,
      recentCommits,
      contributionScore
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    throw error;
  }
} 