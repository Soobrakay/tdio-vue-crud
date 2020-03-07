import { shallowMount } from '@vue/test-utils'
import ListUsers from '../../../src/components/ListUsers.vue'

describe('ListUsers', () => {
  let wrapper = null
  beforeEach(() => {
    wrapper = shallowMount(ListUsers, {
      propsData: {
        users: [
          {
            id: 1,
            name: 'Test User #1',
            username: 'user_1',
            email: 'test1@gmail.com',
            editing: false
          },
          {
            id: 2,
            name: 'Test User #2',
            username: 'user_2',
            email: 'test2@gmail.com',
            editing: false
          }
        ]
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('is the ListUsers component', () => {
    expect(wrapper.name()).toMatch('ListUsers')
  })

  it('has a header indicating it is a user list', () => {
    expect(wrapper.findAll('h1').length).toEqual(1)
    expect(wrapper.findAll('h1').at(0).text()).toMatch('List of Users:')
  })

  it('creates a header row in a user table', () => {
    expect(wrapper.findAll('th').length).toEqual(5)
    expect(wrapper.findAll('th').at(0).text()).toMatch('User ID')
    expect(wrapper.findAll('th').at(1).text()).toMatch('Name')
    expect(wrapper.findAll('th').at(2).text()).toMatch('Username')
    expect(wrapper.findAll('th').at(3).text()).toMatch('Email')
    expect(wrapper.findAll('th').at(4).text()).toMatch('Actions')
  })

  it('creates a row for each user in the table', () => {
    expect(wrapper.findAll('td').length).toEqual(10)
    expect(wrapper.findAll('td').at(0).text()).toMatch('1')
    expect(wrapper.findAll('td').at(1).text()).toMatch('Test User #1')
    expect(wrapper.findAll('td').at(2).text()).toMatch('user_1')
    expect(wrapper.findAll('td').at(3).text()).toMatch('test1@gmail.com')
    expect(wrapper.findAll('td').at(4).text()).toMatch('Delete')
    expect(wrapper.findAll('td').at(5).text()).toMatch('2')
    expect(wrapper.findAll('td').at(6).text()).toMatch('Test User #2')
    expect(wrapper.findAll('td').at(7).text()).toMatch('user_2')
    expect(wrapper.findAll('td').at(8).text()).toMatch('test2@gmail.com')
    expect(wrapper.findAll('td').at(9).text()).toMatch('Delete')
  })

  describe('User Action buttons when data is read-only', () => {
    it('has a visible delete button', () => {
      expect(wrapper.find('.delete-user').isVisible()).toBe(true)
    })

    it('has a visible edit button', () => {
      expect(wrapper.find('.edit-user').isVisible()).toBe(true)
    })

    it('has a hidden cancel button', () => {
      expect(wrapper.find('.cancel-edit-user').isVisible()).toBe(false)
    })

    it('has a hidden update button', () => {
      expect(wrapper.find('.update-user').isVisible()).toBe(false)
    })

    describe('Edit user button clicked', () => {
      beforeEach(() => {
        wrapper.find('.edit-user').trigger('click', {
          user: {
            id: 1,
            name: 'Test User #1',
            username: 'user_1',
            email: 'test1@gmail.com'
          }
        })
      })

      it('emits an edit-user event when a user is being edited', () => {
        expect(wrapper.emitted('edit-user')).toBeTruthy()
        expect(wrapper.emitted('edit-user').length).toEqual(1)
      })

      it('sets the inputs to match the clicked user', () => {
        expect(wrapper.vm.inputId).toEqual(1)
        expect(wrapper.vm.inputName).toMatch('Test User #1')
        expect(wrapper.vm.inputUsername).toMatch('user_1')
        expect(wrapper.vm.inputEmail).toMatch('test1@gmail.com')
      })
    })
  })

  describe('User action buttons when user is editable', () => {
    beforeEach(() => {
      wrapper = shallowMount(ListUsers, {
        propsData: {
          users: [
            {
              id: 1,
              name: 'Test User #1',
              username: 'user_1',
              email: 'test1@gmail.com',
              editing: true
            },
            {
              id: 2,
              name: 'Test User #2',
              username: 'user_2',
              email: 'test2@gmail.com',
              editing: false
            }
          ]
        }
      })
    })

    it('has a visible delete button', () => {
      expect(wrapper.find('.delete-user').isVisible()).toBe(true)
    })

    it('has an hidden edit button', () => {
      expect(wrapper.find('.edit-user').isVisible()).toBe(false)
    })

    it('has a visible cancel button', () => {
      expect(wrapper.find('.cancel-edit-user').isVisible()).toBe(true)
    })

    it('has a visible update button', () => {
      expect(wrapper.find('.update-user').isVisible()).toBe(true)
    })

    describe('Cancel edit user button clicked', () => {
      beforeEach(() => {
        wrapper.find('.cancel-edit-user').trigger('click', {
          user: {
            id: 1,
            name: 'Test User #1',
            username: 'user_1',
            email: 'test1@gmail.com'
          }
        })
      })

      it('emits a cancel-edit-user event when a user is being edited', () => {
        expect(wrapper.emitted('cancel-edit-user')).toBeTruthy()
        expect(wrapper.emitted('cancel-edit-user').length).toEqual(1)
      })

      it('clears the inputs to match the clicked user', () => {
        expect(wrapper.vm.inputId).toEqual(0)
        expect(wrapper.vm.inputName).toMatch(/^$/)
        expect(wrapper.vm.inputUsername).toMatch(/^$/)
        expect(wrapper.vm.inputEmail).toMatch(/^$/)
      })
    })

    describe('Update user button clicked', () => {
      beforeEach(() => {
        wrapper.find('.update-user').trigger('click', {
          user: {
            id: 1,
            name: 'Test User #1',
            username: 'user_1',
            email: 'test1@gmail.com'
          }
        })
      })

      it('emits a update-user event when a user is being edited', () => {
        expect(wrapper.emitted('update-user')).toBeTruthy()
        expect(wrapper.emitted('update-user').length).toEqual(1)
      })

      it('clears the inputs to match the clicked user', () => {
        expect(wrapper.vm.inputId).toEqual(0)
        expect(wrapper.vm.inputName).toMatch(/^$/)
        expect(wrapper.vm.inputUsername).toMatch(/^$/)
        expect(wrapper.vm.inputEmail).toMatch(/^$/)
      })
    })
  })

  it('emits delete-user when a user is deleted', () => {
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted('delete-user')).toBeTruthy()
    expect(wrapper.emitted('delete-user').length).toEqual(1)
  })
})
