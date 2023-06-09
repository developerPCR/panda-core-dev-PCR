import * as Select from '@radix-ui/react-select'
import classNames from 'classnames'
import React, { ReactNode } from 'react'
import { FiCheck, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { getMagicPalette, getPalette } from '@core/helpers/palette'
import {
  SIZE,
  DEFAULT_SIZE,
  PADDINGS,
  PADDINGS_X,
  ROUNDED,
  UI_VARIANT,
  UI_DEFAULT_VARIANT,
} from '@core/types/ui-kit'

type SelectProps = {
  placeholder: ReactNode
  children: ReactNode
  size?: SIZE
  variant?: UI_VARIANT
  outline?: boolean
  magic?: boolean
  [x: string]: any
}

type SelectItemProps = {
  children?: ReactNode
  value?: string
  [x: string]: any
}

export const BPSelectSeparator = ({ ...props }) => {
  return <Select.Separator className="SelectSeparator" {...props} />
}

export const BPSelectGroup = Select.Group

export const BPSelectLabel = Select.Label

export const BPSelectItem = ({
  children,
  value = '',
  ...props
}: SelectItemProps) => {
  const selectClass = classNames({
    SelectItem: true,
  })

  return (
    <Select.Item className={selectClass} value={value} {...props}>
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="SelectItemIndicator">
        <FiCheck />
      </Select.ItemIndicator>
    </Select.Item>
  )
}

export function BPSelect({
  children,
  placeholder,
  size = DEFAULT_SIZE,
  variant = UI_DEFAULT_VARIANT,
  outline = false,
  magic = false,
  disabled = false,
  className,
  ...props
}: SelectProps) {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, variant)
  const magicPalette = getMagicPalette()

  const triggerClass = classNames({
    [`text-${size === 'md' ? 'base' : size}`]: true,
    [`p-${PADDINGS[size]}`]: true,
    [`px-${PADDINGS_X[size]}`]: true,
    [`${ROUNDED[size]}`]: true,
    [`${palette.focus}`]: true,
    [`${palette.border}`]: !magic,
    [`${palette.link}`]: true,
    [`${palette.color}`]: true,
    [`${palette.bg}`]: true,
    [`${palette.hover}`]: !magic,
    'transition ease-in-out': true,
    'select-none cursor-not-allowed': disabled,
    'opacity-70': disabled && !magic,
    SelectTrigger: true,
    [props.className]: className,
  })

  const viewportClass = classNames({
    [`${palette.bg}`]: true,
    [`${palette.color}`]: true,
    [`${palette.border}`]: true,
    [`text-${size === 'md' ? 'base' : size}`]: true,
    SelectViewport: true,
  })

  const Trigger = () => (
    <Select.Trigger className={triggerClass}>
      <Select.Value placeholder={placeholder} />
      <Select.Icon className="SelectIcon">
        <FiChevronDown />
      </Select.Icon>
    </Select.Trigger>
  )
  const wrapperClass = classNames({
    [`${ROUNDED[size]} ${magicPalette}`]: true,
    [props.className]: props.className,
  })

  return (
    <Select.Root {...props} disabled={disabled}>
      {magic ? (
        <div className={wrapperClass}>
          <Trigger />
        </div>
      ) : (
        <Trigger />
      )}
      <Select.Portal container={document.getElementById('BPportal')}>
        <Select.Content className="SelectContent">
          <Select.ScrollUpButton className="SelectScrollButton">
            <FiChevronUp />
          </Select.ScrollUpButton>
          <Select.Viewport className={viewportClass}>
            {children}
          </Select.Viewport>
          <Select.ScrollDownButton className="SelectScrollButton">
            <FiChevronDown />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
