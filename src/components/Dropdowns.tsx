import { Select } from '.'
import { useAppContext } from '../context/Context'
import { DropdownValue } from '../interfaces'

export const Dropdowns = () => {
  const { assigned, status, setAssigned, setStatus } = useAppContext()

  return (
    <div className="selector__container">
      <div className="selector__div">
        <Select
          value={assigned}
          variant="users"
          onChange={(value: DropdownValue) => setAssigned(value)}
          label="Assign User"
        />
      </div>
      <div className="selector__div">
        <Select
          value={status}
          variant="status"
          onChange={(value: DropdownValue) => setStatus(value)}
          label="Set Status"
        />
      </div>
    </div>
  )
}
