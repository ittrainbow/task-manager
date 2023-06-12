import { Select } from '.'
import { useAppContext } from '../context/Context'
import { DropdownValue } from '../interfaces'

export const Dropdowns = () => {
  const { assigned, status, setAssigned, setStatus } = useAppContext()

  const assignHandler = (e: DropdownValue) => {
    const value = typeof e === 'string' ? e.valueOf() : e.target.value
    setAssigned(value)
  }

  const statusHandler = (e: DropdownValue) => {
    const value = typeof e === 'string' ? e.valueOf() : e.target.value
    setStatus(value)
  }

  return (
    <div className="selector__container">
      <div className="selector__div">
        <Select
          value={assigned}
          variant="users"
          onChange={assignHandler}
          label="Assign User"
        />
      </div>
      <div className="selector__div">
        <Select value={status} variant="status" onChange={statusHandler} label="Set Status" />
      </div>
    </div>
  )
}
