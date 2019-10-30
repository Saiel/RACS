import React, { PropsWithChildren } from 'react'

import './Flex.scss';

export interface FlexProps {
  direction?: 'row' | 'column'
}

const Flex: React.FC<PropsWithChildren<FlexProps>> = ({ children, direction = 'row' }) => {
  return (
    <div className={`Flex Flex_${direction}`}>
      {children}
    </div>
  )
};

export interface FlexItemProps {
  flexValue?: number
}

export const FlexItem: React.FC<PropsWithChildren<FlexItemProps>> = ({ children, flexValue }) => {
  return (
    <div className={`Flex-Item Flex-Item_${flexValue ? flexValue : 1}`}>
      {children}
    </div> 
  )
}

export default Flex;