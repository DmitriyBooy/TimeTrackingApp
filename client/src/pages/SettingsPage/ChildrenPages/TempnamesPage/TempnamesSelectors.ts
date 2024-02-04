import { type RootState } from '../../../../store'
import { type TempnameType } from '../../SettingsPageTypes'

export const selectTempnames = ({ settings }: RootState): TempnameType[] | null => settings.tempnames
