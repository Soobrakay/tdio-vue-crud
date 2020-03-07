import store from '../../src/store'

describe('store', () => {
  it('initializes with correct values', () => {
    expect(store.state.message).toMatch('')
    expect(store.state.messageStatus).toMatch('Info')
  })

  it('has getters', () => {
    store.state.message = 'Successful Message'
    store.state.messageStatus = 'Success'

    expect(store.getters.getMessage).toMatch('Successful Message')
    expect(store.getters.getMessageStatus).toMatch('Success')
  })

  it('has mutations', () => {
    store.state.message = 'Successful Message'
    store.state.messageStatus = 'Success'

    store.commit('setMessage', 'Failed Message')
    store.commit('setMessageStatus', 'Failure')

    expect(store.state.message).toMatch('Failed Message')
    expect(store.state.messageStatus).toMatch('Failure')
  })

  it('has actions', () => {
    store.state.message = 'Temporary Message'
    store.state.messageStatus = 'Info'

    store.dispatch('setBanner', { message: 'It worked!', status: 'Success' })

    expect(store.state.message).toMatch('It worked!')
    expect(store.state.messageStatus).toMatch('Success')
  })
})
