const suffix = (process.env.NODE_ENV === 'production' ? 'PRD' : 'DEV')

module.exports = {
  providerGitHubClientId: process.env[`PROVIDER_GITHUB_CLIENT_ID_${suffix}`],
  providerGitHubClientSecret: process.env[`PROVIDER_GITHUB_CLIENT_SECRET_${suffix}`]
}
