export const type = (name, state) => `@@Chunky/${state.toUpperCase()}/${name}`
export const timestamp = () => Date.now()

export const start = (name, action) => ({ type:  type(name, "start"), timestamp: timestamp(), flavor: action.flavor, provider: action.provider })
export const error = (name, error, action) => ({ type:  type(name, "error"), flavor: action.flavor, provider: action.provider, error, timestamp: timestamp() })
export const ok = (name, data, action) => ({ type:  type(name, "ok"), data, flavor: action.flavor, provider: action.provider, timestamp: timestamp() })

export function asyncAction (name, operation, action) {
  return (dispatch) => {
    dispatch(start(name, action))
    operation().
      then(data => dispatch(ok(name, data, action))).
      catch(err => dispatch(error(name, err, action)))
  }
}

export function syncAction (name, operation, action) {
  return (dispatch) => {
      dispatch(ok(name, operation(), action))
  }
}

export function asyncActions (collection) {
  return (dispatch) => {
    collection.forEach(item => asyncAction(item.name, item.operation, item)(dispatch)) 
  }
}

export function syncActions (collection) {
  return (dispatch) => {
    collection.forEach(item => syncAction(item.name, item.operation, item)(dispatch)) 
  }
}