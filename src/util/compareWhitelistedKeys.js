export default (prevState, state, whitelistedKeys) => {
	let isUpdated = false;
  whitelistedKeys.forEach((key) => {
  	if (JSON.stringify(prevState[key]) !== JSON.stringify(state[key])) {
    	isUpdated = true
    }
  })
  return isUpdated
}
