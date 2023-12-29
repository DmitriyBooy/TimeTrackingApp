import {FC} from "react";
import { DropdownListItemType } from './types'
import styles from './DropdownListItem.module.scss'

export type DropdownListItemProps = DropdownListItemType & {
    onClick: (item: DropdownListItemType) => void
}

const DropdownListItem: FC<DropdownListItemProps> = ({ label, id, onClick }) => {
    const onClickHandler = () => {
        onClick({
            label,
            id
        })
    }

    return (
        <div
            className={styles.item}
            onClick={onClickHandler}
        >
            {label}
        </div>
    )
}

export default DropdownListItem
