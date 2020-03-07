import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Banner from '../../../src/components/Banner.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Banner', () => {
  let wrapper = null
  let getters = null
  let actions = null
  let store = null

  beforeEach(() => {
    getters = {
      getMessage: () => 'Default',
      getMessageStatus: () => 'Info'
    }

    actions = { setBanner: jest.fn() }
    store = new Vuex.Store({ actions, getters })
  })

  afterEach(() => {
    wrapper.destroy()
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('it initializes with error message', () => {
    getters = {
      getMessage: () => 'Message 123',
      getMessageStatus: () => 'Error'
    }
    store = new Vuex.Store({ actions, getters })
    wrapper = shallowMount(Banner, { localVue, store })

    expect(wrapper.vm.message).toMatch('Message 123')
    expect(wrapper.vm.color).toMatch('red')
  })

  it('it initializes with success message', () => {
    getters = {
      getMessage: () => 'Zombies',
      getMessageStatus: () => 'Success'
    }
    store = new Vuex.Store({ actions, getters })
    wrapper = shallowMount(Banner, { localVue, store })

    expect(wrapper.vm.message).toMatch('Zombies')
    expect(wrapper.vm.color).toMatch('green')
  })

  it('it initializes with info message', () => {
    wrapper = shallowMount(Banner, { localVue, store })

    expect(wrapper.vm.message).toMatch('Default')
    expect(wrapper.vm.color).toMatch('blue')
  })

  it('clears the banner when clear is clicked', () => {
    wrapper = shallowMount(Banner, { localVue, store })

    wrapper.find('span').trigger('click')
    expect(actions.setBanner.mock.calls).toHaveLength(1)
    expect(actions.setBanner.mock.calls[0][1])
      .toEqual({ message: '', status: 'Info' })
  })
})
