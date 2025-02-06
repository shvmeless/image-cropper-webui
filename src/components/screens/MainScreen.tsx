// IMPORTS
import { useContext, type ReactNode } from 'react'
import { useClasses } from '@hooks/common/useClasses'
import { ImageInput } from '@ui/ImageInput/ImageInput'
import css from './MainScreen.module.scss'
import { ImageInputContext } from '@contexts/common/ImageInputContext'

// PROPS
interface MainScreenProps {
  className?: string
}

// COMPONENT
export function MainScreen (props: MainScreenProps): ReactNode {

  // CONTEXT
  const input = useContext(ImageInputContext)

  // HANDLER
  const inputChangeHandler = (file: File): void => {
    input.read(file).catch(console.error)
  }

  // RENDER
  return <div className={useClasses(css.MainScreen, props.className)}>
    <div className={css.header}>
      <h1 className={css.brand}>{'Image Cropper'}</h1>
    </div>

    <div className={css.input}>
      <ImageInput onChange={inputChangeHandler}/>
    </div>
  </div>

}
