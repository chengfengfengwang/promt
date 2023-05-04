import { useRef, useEffect, useState } from 'react'
import { createPopper } from '@popperjs/core'

export default function () {
  const promptList = [
    'Please correct my grammar first, and then answer my question while practicing English speaking with me',
    'japanwest',
    '66e198439fe64315bef65154a08a1452'
  ]
  const promptRef = useRef(null)
  const curInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const popperInstance = useRef(null)
  const [promptVisible, setPromptVisible] = useState(false)
  const handleItemClick = (text: string) => {
    const activeElement = curInputRef.current;
    const nativeValueSetter = Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(activeElement),'value').set;
    nativeValueSetter.call(activeElement, text);
    activeElement.dispatchEvent(new Event("input", { bubbles: true }))
    setPromptVisible(false)
  }
  useEffect(() => {
    const handleInput = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        const target = e.target as HTMLInputElement | HTMLTextAreaElement
        const value = target.value
        if (value.startsWith('/')) {
          curInputRef.current = target;
          setPromptVisible(true)
          promptRef.current.style.width = target.offsetWidth + 'px'
          if (!popperInstance.current) {
            popperInstance.current = createPopper(target, promptRef.current, {
              placement: 'top',
            })
          }
        } else {
          setPromptVisible(false)
        }
      }
    }
    const handleBlur = (e) => {
      if (
        document.activeElement.tagName !== 'INPUT' &&
        document.activeElement.tagName !== 'TEXTAREA'
      ) {
        setPromptVisible(false)
      }
    }
    document.addEventListener('input', handleInput)
    document.addEventListener('click', handleBlur)
    return () => {
      document.removeEventListener('input', handleInput)
      document.removeEventListener('click', handleBlur)
    }
  }, [])

  return (
    <>
      {/* <div className="p-20 border border-solid">
        <textarea  className='border border-solid'></textarea>
      </div> */}
      <div
        ref={promptRef}
        className={`${
          promptVisible ? 'visible' : 'invisible'
        } absolute bg-white px-4 border-2 border-solid rounded-md shadow-sm divide-y divide-solid divide-slate-200 text-sm font-medium text-slate-900`}
      >
        {promptList.map((item, index) => {
          return (
            <div onClick={() => handleItemClick(item)} key={index} className="py-2 cursor-pointer">
              {item}
            </div>
          )
        })}
      </div>
    </>
  )
}
