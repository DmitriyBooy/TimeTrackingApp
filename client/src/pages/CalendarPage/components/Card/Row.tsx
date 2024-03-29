import { type FC, useState, type ChangeEventHandler } from 'react'
import { type RowType } from 'types/CalendarTypes'

const Row: FC<RowType & { date: string }> = ({ title, from, to }) => {
  const [stateTitle, setStateTitle] = useState(title ?? '')
  const [stateFrom, setStateFrom] = useState(from ?? '')
  const [stateTo, setStateTo] = useState(to ?? '')

  const onChangeTitleHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setStateTitle(event.target.value)
  }

  const onChangeFromHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setStateFrom(event.target.value)
  }

  const onChangeToHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setStateTo(event.target.value)
  }

  const onRemoveHandler = (): void => {
    // KalendarService.removeRow(date, id)
  }

  return <div style={{ display: 'flex', overflow: 'hidden', gap: '10px' }}>
        <input
            value={stateTitle}
            onChange={onChangeTitleHandler}
        />

        <input
            style={{ width: '50px' }}
            value={stateFrom}
            onChange={onChangeFromHandler}
        />

        <input
            style={{ width: '50px' }}
            value={stateTo}
            onChange={onChangeToHandler}
        />

        <button onClick={onRemoveHandler}>x</button>
    </div>
}

export default Row
