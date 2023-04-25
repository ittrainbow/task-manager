import React, { useState, useEffect } from 'react'
// import Select from 'react-select'
import Select from "react-select-animated-v2"
import { useSelector } from 'react-redux'
import { selectApp } from '../redux/selectors'

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

    const getClassname = variant === 'sort' ? 'select-sort' : 'select'

    return (
      <div className="select-container">
        <Select
          options={options}
          onChange={handleChange}
          maxMenuHeight={tasknew ? 240 : 300}
          className={getClassname}
          defaultValue={options.filter((option) => option.value === value)}
        />
      </div>
    )
  }
  return (
    <div className="app">
      <CustomSelect />
    </div>
  )
}
