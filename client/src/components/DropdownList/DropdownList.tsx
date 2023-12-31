import {FC, RefObject} from "react";

import Dropdown from '../Dropdown'
import DropdownListItem from './components/DropdownListItem'
import { DropdownListItemType } from './components/types'


type DropdownListProps = {
    anchor: RefObject<HTMLElement>
    isOpen: boolean
    onClose: () => void
    items: DropdownListItemType[]
    onItemClick: (item: DropdownListItemType) => void
}

const DropdownList: FC<DropdownListProps> = ({
    anchor,
    isOpen,
    onClose,
    items,
    onItemClick
}) => {
    const onItemClickHandler = (item: DropdownListItemType) => {
        onItemClick(item)
        onClose()
    }

    return (
        <Dropdown
            isOpen={isOpen}
            onClose={onClose}
            anchor={anchor}
        >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {
                    items.map((item) =>
                        <DropdownListItem
                            key={item.id}
                            onClick={onItemClickHandler}
                            {...item}
                        />
                    )
                }
            </div>
        </Dropdown>
    )
}

export default DropdownList
