import * as RadioGroup from '@radix-ui/react-radio-group'
import classNames from 'classnames'
import React from 'react'
import { FiCheck } from 'react-icons/fi'
import { getMagicText, getPalette } from '@core/helpers/palette'
import {
  DEFAULT_SIZE,
  ICON_SIZE,
  PADDINGS,
  SIZE,
  UI_DEFAULT_VARIANT,
  UI_VARIANT,
} from '@core/types/ui-kit'

type BPRadioGroupProps = {
  children?: React.ReactNode
  size?: SIZE
  variant?: UI_VARIANT
  defaultValue?: string
  outline?: boolean
  magic?: boolean
  [x: string]: any
}

type BPRadioGroupItemsProps = {
  id: string
  value: string
  label?: string
  [x: string]: any
}

export const BPRadioGroupItem = ({
  value,
  id,
  label,
  outline,
  magic,
  disabled,
  variant = UI_DEFAULT_VARIANT,
  ...props
}: BPRadioGroupItemsProps) => {
  const magicText = getMagicText()
  const titleClass = classNames({
    [magicText]: magic,
  })

  const indicatorClass = classNames({
    [`p-${PADDINGS[props.size as SIZE]}`]: true,
    [`${props.palette.bg}`]: true,
    [`${props.palette.border}`]: outline,
    [`${ICON_SIZE[props.size as SIZE]}`]: true,
    [`${props.palette.color}`]: outline && !magic,
    [`text-white dark:text-black`]: variant === 'inverted',
    [`rounded-full flex justify-center items-center`]: true,
    'select-none cursor-not-allowed	': disabled,
  })

  const textClass = classNames({
    [`text-${props.size === 'md' ? 'base' : props.size}`]: true,
    'opacity-70': disabled,
    [`${props.palette.color}`]: outline && !magic,
  })
  const iconClass = classNames({
    [`text-${props.size === 'md' ? 'base' : props.size}`]: true,
  })

  return (
    <>
      <RadioGroup.Item
        className={indicatorClass}
        value={value}
        id={id}
        disabled={disabled}
        {...props}
      >
        <RadioGroup.Indicator className={iconClass}>
          <FiCheck />
        </RadioGroup.Indicator>
      </RadioGroup.Item>
      <label className={classNames(textClass, titleClass)} htmlFor={id}>
        {label}
      </label>
    </>
  )
}

const BPRadioGroup = ({
  children,
  size = DEFAULT_SIZE,
  variant = UI_DEFAULT_VARIANT,
  outline = false,
  magic = false,
  defaultValue = 'default',
  ...props
}: BPRadioGroupProps) => {
  const superSet = outline ? 'outline' : 'normal'
  const palette = getPalette(superSet, variant)

  const elementClass = classNames({
    'flex flex-col gap-2': true,
    [props.className]: props.className,
  })

  const Element = () => (
    <RadioGroup.Root
      className={elementClass}
      defaultValue={defaultValue}
      {...props}
    >
      {React.Children.map(children, (child) => {
        return (
          <div className="flex gap-4 items-center">
            {React.cloneElement(child as React.ReactElement<any>, {
              size,
              palette,
              outline,
              magic,
              variant,
            })}
          </div>
        )
      })}
    </RadioGroup.Root>
  )

  return <>{magic ? <Element /> : <Element />}</>
}

export default BPRadioGroup
