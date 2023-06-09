const getBaseUrl = (instUrl: string) => {
  let completeUrl = ''
  instUrl = instUrl.trim()

  if (!instUrl) {
    instUrl = 'fakenotexistingurl'
  } else {
    if (instUrl.charAt(instUrl.length -1) === '/') {
      instUrl = instUrl.slice(0, -1)
    }
    if (instUrl.startsWith('http')) {
      completeUrl = instUrl
    } else if (instUrl.search('.')) {
      completeUrl = `https://${instUrl}`
    }
  }

  if (!completeUrl) {
    completeUrl = `https://${instUrl}.demoserver.pro`
  }

  return completeUrl
}

export {
  getBaseUrl
}
