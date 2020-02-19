import { shallowMount } from '@vue/test-utils'
import Content from '@/components/Content.vue'
import axios from 'axios'

jest.mock('axios')
// mock the console log to minimize test noise
global.console.log = jest.fn()

let wrapper = null

describe('Content', () => {
  afterEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  describe('initialization with successful ajax', () => {
    beforeEach(() => {
      const responseGet = {
        data: [
          {
            id: 1,
            name: 'Leane Graham',
            username: 'Bret',
            email: 'Sincere@april.biz'
          },
          {
            id: 2,
            name: 'Ervin Howell',
            username: 'Antonette',
            email: 'Shanna@melissa.tv'
          }
        ]
      }

      // noinspection JSCheckFunctionSignatures
      axios.get.mockResolvedValue(responseGet)
      wrapper = shallowMount(Content)
    })

    it('initializes #name', () => {
      expect(wrapper.name()).toMatch('Content')
    })

    it('loads data.users through ajax', () => {
      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get)
        .toBeCalledWith('https://jsonplaceholder.typicode.com/users')
    })

    it('sets users properly', () => {
      expect(wrapper.vm.users.length).toEqual(2)
      expect(wrapper.vm.users[0].name).toMatch('Leane Graham')
      expect(wrapper.vm.users[0].username).toMatch('Bret')
      expect(wrapper.vm.users[0].email).toMatch('Sincere@april.biz')
      expect(wrapper.vm.users[1].name).toMatch('Ervin Howell')
      expect(wrapper.vm.users[1].username).toMatch('Antonette')
      expect(wrapper.vm.users[1].email).toMatch('Shanna@melissa.tv')
    })

    it('sets a success banner', () => {
      expect(wrapper.vm.message).toMatch('SUCCESS! Loaded USER data!')
      expect(wrapper.vm.messageStatus).toMatch('Success')
    })

    describe('#createUser', () => {
      it('saves the new user data on successful post', () => {
        const responsePost = {
          data: [
            {
              id: 3,
              name: 'Patrick',
              username: 'patrick123',
              email: 'patrick@email.com'
            }
          ]
        }
        // noinspection JSCheckFunctionSignatures
        axios.post.mockResolvedValue(responsePost)

        const user = {
          id: 3,
          name: 'Name',
          username: 'User Name',
          email: 'email@gmail.com',
          editing: false
        }
        // act
        wrapper.vm.createUser(user)
        expect(axios.post).toHaveBeenCalledTimes(1)
        expect(axios.post)
          .toBeCalledWith('https://jsonplaceholder.typicode.com/users', user)

        wrapper.vm.$nextTick().then(() => {
          expect(wrapper.vm.users.length).toEqual(3)
          expect(wrapper.vm.messageStatus).toMatch('Success')
          expect(wrapper.vm.message).toMatch('SUCCESS! User data was saved!')
        })
      })

      it('does not save new user data on failed post', () => {
        // noinspection JSCheckFunctionSignatures
        axios.post.mockRejectedValue(new Error('BAD CREATE'))

        const user = {
          id: 3,
          name: 'Name',
          username: 'User Name',
          email: 'email@gmail.com',
          editing: false
        }
        // act
        wrapper.vm.createUser(user)
        expect(axios.post).toHaveBeenCalledTimes(1)
        expect(axios.post)
          .toBeCalledWith('https://jsonplaceholder.typicode.com/users', user)

        wrapper.vm.$nextTick().then(() => {
          expect(wrapper.vm.users.length).toEqual(2)
          expect(wrapper.vm.messageStatus).toMatch('Error')
          expect(wrapper.vm.message).toMatch('ERROR! Unable to save user data!')
          expect(global.console.log).toHaveBeenCalledWith('BAD CREATE')
        })
      })
    })
  })

  describe('initialization with unsuccessful ajax', () => {
    beforeEach(() => {
      axios.get.mockRejectedValue(new Error('BAD REQUEST'))
      wrapper = shallowMount(Content)
    })

    it('initializes #name', () => {
      expect(wrapper.name()).toMatch('Content')
    })

    it('attempts ajax load', () => {
      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get)
        .toBeCalledWith('https://jsonplaceholder.typicode.com/users')
    })

    it('loads no user data', () => {
      expect(wrapper.vm.users.length).toEqual(0)
    })

    it('logs the error', () => {
      expect(global.console.log).toHaveBeenCalledWith('BAD REQUEST')
    })

    it('sets an error banner', () => {
      expect(wrapper.vm.message).toMatch('ERROR! Unable to load USER data!')
      expect(wrapper.vm.messageStatus).toMatch('Error')
    })
  })
})
