import { type FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectTempnames } from './TempnamesSelectors'
import { useAppDispatch } from '../../../../store'
import { getTempnamesAsync, deleteTempnameAsync } from './TempnamesThunks'

const TempnamesPage: FC = () => {
  const dispatch = useAppDispatch()
  const tempnames = useSelector(selectTempnames)

  useEffect(() => {
    if (tempnames === null) {
      dispatch(getTempnamesAsync())
    }
  })

  const onTempnameDelete = (id: number): void => {
    dispatch(deleteTempnameAsync(id))
  }

  if (tempnames === null) {
    return null
  }

  return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
         {
            tempnames.map((tempname) => (
                <div key={tempname.id}>
                  <span>{tempname.name}</span>

                  <button onClick={() => { onTempnameDelete(tempname.id) }}>x</button>
                </div>
            ))
         }
      </div>
  )
}

export default TempnamesPage
