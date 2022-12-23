import React from 'react'
import { useTheme } from '@core/hooks/useTheme'
import { FiSun, FiMenu } from 'react-icons/fi'
import Image from 'next/image'
import Link from 'next/link'
import Dropdown from '@components/molecules/Dropdown'
import Button from '@components/atoms/Button'

export default function NavBar() {
  const { themeDark, themeLight, theme } = useTheme()

  const AccountOptions = [
    {
      label: 'Profile',
      icon: <FiMenu />,
      onClick: () => {},
    },
    {
      label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`,
      icon: <FiSun />,
      onClick: () => {
        theme === 'dark' ? themeLight() : themeDark()
      },
    },
  ]

  return (
    <nav className="backdrop-blur-xl bg-neutral-50 dark:bg-normal-900 opacity-75 fixed top-0 w-full p-2 flex justify-between items-center border-b border-neutral-800">
      <div>
        <Link href="/">
          <Image src="/logo.png" alt="" width={45} height={22} />
        </Link>
      </div>
      <div className="items-center gap-2 hidden md:flex">
        <Link href="/pricing">
          <Button>Restricted Area</Button>
        </Link>
        <Dropdown options={AccountOptions} title={'Options'} />
      </div>
      <div className="items-center gap-2 md:hidden">
        <Dropdown options={AccountOptions} icon={<FiMenu />} />
      </div>
    </nav>
  )
}