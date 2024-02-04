import { type ChangeEventHandler, type FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectTempnames } from './TempnamesSelectors'
import { useAppDispatch } from '../../../../store'
import { getTempnamesAsync, deleteTempnameAsync, updateTempnameAsync, addTempnateAsync } from './TempnamesThunks'
import Input from 'components/Input'
import Button from '../../../../components/Button'

import styles from './TempnamesPage.module.css'

const TempnamesPage: FC = () => {
  const dispatch = useAppDispatch()
  const tempnames = useSelector(selectTempnames)

  const [newTempnate, setNewTempnate] = useState<string>('')

  useEffect(() => {
    if (tempnames === null) {
      dispatch(getTempnamesAsync())
    }
  })

  if (tempnames === null) {
    return null
  }

  const onAddNewTempname = (): void => {
    if (newTempnate !== '') {
      dispatch(addTempnateAsync(newTempnate))
      setNewTempnate('')
    }
  }

  const TempnamesList = tempnames.map(({ id, name }) => {
    const onTempnameUpdate: ChangeEventHandler<HTMLInputElement> = (event): void => {
      const value = event.target.value

      if (value !== '') {
        dispatch(updateTempnameAsync({ id, name: value }))
      }
    }

    const onTempnameDelete = (): void => {
      dispatch(deleteTempnameAsync(id))
    }

    return (
      <div className={styles.tempnameItem} key={id}>
        <Input
            value={name}
            onBlur={onTempnameUpdate}
        />

        <Button onClick={onTempnameDelete}>
          Удалить
        </Button>
      </div>
    )
  })

  const onBlur: ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewTempnate(event.target.value)
  }

  return (
      <>
        <div className={styles.newTempnameConteiner}>
          <Input
              value={newTempnate}
              onBlur={onBlur}
              placeholder="Название"
          />

          <Button
             onClick={onAddNewTempname}
          >
            +
          </Button>
        </div>

        <div className={styles.tempnamesContainer}>
          {TempnamesList}
        </div>
      </>
  )
}

export default TempnamesPage
