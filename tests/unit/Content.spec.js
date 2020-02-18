import { shallowMount } from '@vue/test-utils'
import Content from '@/components/Content.vue'
import axios from 'axios'

jest.mock('axios')

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

    describe('#createUser', () => {
      it('adds the user to users', () => {
        const user = {
          name: 'Name', username: 'User Name', email: 'email@gmail.com'
        }
        // act
        wrapper.vm.createUser(user)
        const lastUser = wrapper.vm.users[wrapper.vm.users.length - 1]

        expect(lastUser.name).toEqual(user.name)
        expect(lastUser.username).toEqual(user.username)
        expect(lastUser.email).toEqual(user.email)
        expect(lastUser.id).toEqual(wrapper.vm.users.length)
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
  })
})
