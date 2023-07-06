import { Select } from '.'
import { useAppContext } from '../context/Context'
import { DropdownVariants } from '../interfaces'

export const Dropdowns = () => {
  const { assigned, status, setAssigned, setStatus } = useAppContext()

  const assignHandler = (e: string) => setAssigned(e)
  const statusHandler = (e: string) => setStatus(e)

  return (
    <div className="selector__container">
      <div className="selector__div">
        <Select
          value={assigned}
          variant={DropdownVariants.assigned}
          onChange={assignHandler}
          label="Assign User"
        />
      </div>
      <div className="selector__div">
        <Select
          value={status}
          variant={DropdownVariants.status}
          onChange={statusHandler}
          label="Set Status"
        />
      </div>
    </div>
  )
}
