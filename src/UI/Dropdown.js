import React, { useState, useEffect } from 'react'
// import Select from 'react-select'
import InputLabel from 'react-select'
import Select from 'react-select-animated-v2'
import { useSelector } from 'react-redux'
import { selectApp, selectTask } from '../redux/selectors'

const sortOptions = [
  { label: 'My (open, expiring first)', value: 0 },
  { label: 'My (all, newest first)', value: 1 },
  { label: 'All (open, expiring first)', value: 2 },
  { label: 'All (all, newest first)', value: 3 }
]

const statusOptions = [
  { label: 'New', value: 'New' },
  { label: 'Open', value: 'Open' },
  { label: 'Closed', value: 'Closed' }
]

export const Dropdown = ({ variant, value, onChange, tasknew }) => {
  const [userOptions, setUserOptions] = useState([])
  const { userlist } = useSelector(selectApp)
  const { newTask } = useSelector(selectTask)

  useEffect(() => {
    if (userlist) {
      const array = [{ label: 'not assigned', value: null }]
      userlist.forEach((user) => {
        const obj = {}
        obj.label = user.name
        obj.value = user.uid
        array.push(obj)
      })
      setUserOptions(array)
    }
  }, [userlist])

  const CustomSelect = () => {
    let options

    switch (variant) {
      case 'sort':
        options = sortOptions
        break
      case 'status':
        options = statusOptions
        break
      case 'users':
        options = userOptions
        break
      default:
        break
    }

    const handleChange = (option) => {
      onChange(option)
    }

    const getHeader = () => {
      switch (variant) {
        case 'sort':
          return
        case 'status':
          return newTask ? 'Status' : ''
        case 'users':
          return newTask ? 'User' : ''
        default:
          break
      }
    }

    return (
      <>
        {/* <div className="dropdown-label">{getHeader()}</div> */}
        <Select
          options={options}
          onChange={handleChange}
          maxMenuHeight={tasknew ? 210 : 300}
          className="select"
          defaultValue={options.filter((option) => option.value === value)}
        />
      </>
    )
  }
  return (
    <>
      <CustomSelect />
    </>
  )
}
