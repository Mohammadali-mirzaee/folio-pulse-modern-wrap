
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Set initial value
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Use a more efficient resize handler with debounce
    let timeoutId: number | undefined
    
    const handleResize = () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
      
      timeoutId = window.setTimeout(() => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      }, 100) // 100ms debounce
    }
    
    window.addEventListener("resize", handleResize)
    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return isMobile
}
