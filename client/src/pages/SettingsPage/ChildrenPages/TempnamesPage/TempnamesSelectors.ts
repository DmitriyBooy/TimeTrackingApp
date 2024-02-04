import { type RootState } from '../../../../store'
import { type TempnameType } from 'types/TempnamesTypes'

export const selectTempnames = ({ settings }: RootState): TempnameType[] | null => settings.tempnames
