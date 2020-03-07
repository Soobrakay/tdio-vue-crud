import { shallowMount } from '@vue/test-utils'
import AddUser from '../../../src/components/AddUser.vue'

let wrapper = null

describe('AddUser', () => {
  beforeEach(() => {
    wrapper = shallowMount(AddUser)
  })

  afterEach(() => {
    wrapper.destroy()
  })

  describe('initialization', () => {
    it('initializes name', () => {
      expect(wrapper.name()).toMatch('AddUser')
    })

    it('initializes all user properties to empty string', () => {
      expect(wrapper.vm.user.name).toMatch(/^$/)
      expect(wrapper.vm.user.username).toMatch(/^$/)
      expect(wrapper.vm.user.email).toMatch(/^$/)
    })

    it('renders an h1 with instruction text', () => {
      expect(wrapper.findAll('h1').length).toEqual(1)
      expect(wrapper.findAll('h1').at(0).text()).toMatch('Add a New User:')
    })

    it('renders labels for all the inputs', () => {
      expect(wrapper.findAll('label').length).toEqual(3)
      expect(wrapper.findAll('label').at(0).text()).toMatch('Name:')
      expect(wrapper.findAll('label').at(1).text()).toMatch('Username:')
      expect(wrapper.findAll('label').at(2).text()).toMatch('Email:')
    })
  })
  describe('create-user with valid data', () => {
    beforeEach(() => {
      wrapper.setData({
        user: { name: 'Name1', username: 'Username1', email: 'user@email.com' }
      })
      wrapper.find('button').trigger('click')
    })

    it('emits create-user', () => {
      expect(wrapper.emitted('create-user')).toBeTruthy()
      expect(wrapper.emitted('create-user').length).toEqual(1)
    })

    it('clears the user data', () => {
      expect(wrapper.vm.user.name).toMatch(/^$/)
      expect(wrapper.vm.user.username).toMatch(/^$/)
      expect(wrapper.vm.user.email).toMatch(/^$/)
    })
  })

  it('does not emit create-user when a new user without data is added', () => {
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted('create-user')).toBeFalsy()
  })
})
