import { RefObject, useEffect, useRef } from 'react'

interface UseScrollBottomProps {
  ref: RefObject<HTMLElement>
  onScroll(): Promise<void>
}

export const useScrollBottom = ({ ref, onScroll }: UseScrollBottomProps) => {
  const isFetching = useRef(false)

  useEffect(() => {
    const scrollElement = ref.current
    if (!scrollElement) {
      return
    }

    const onScrollEvent = () => {
      if (isFetching.current) {
        return
      }

      const isBottomReached =
        scrollElement.scrollTop + scrollElement.clientHeight >
        scrollElement.scrollHeight * 0.85

      if (!isBottomReached) {
        return
      }

      isFetching.current = true
      onScroll().finally(() => {
        isFetching.current = false
      })
    }

    scrollElement.addEventListener('scroll', onScrollEvent)

    return () => {
      scrollElement.removeEventListener('scroll', onScrollEvent)
    }
  }, [])
}
